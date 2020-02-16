const { authenticated } = require('../auth')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { uploadFile, getFileUrl } = require('../services/file')
const uuidv4 = require('uuid/v4')

const resolvers = {
  Query: {
    me: authenticated(async (root, args, { models, currentUser }) => {
      return models.User.findOne({ where: { username: currentUser.username } })
    }),
    async users(parent, { subString }, { models }) {
      if (subString) {
        return models.User.findAll({
          where: {
            username: {
              [models.Sequelize.Op.like]: `%${subString}%`,
            },
          },
        })
      }
      return []
    },
    async user(parent, { username }, { models }) {
      return models.User.findOne({ where: { username } })
    },
    async wish(parent, { id }, { models }) {
      return models.Wish.findByPk(id)
    },
    async friendshipStatus(parent, { username }, { models, currentUser }) {
      const me = await models.User.findOne({
        where: {
          username: currentUser.username,
        },
      })

      const friend = await models.User.findOne({
        where: {
          username,
        },
      })

      return models.FriendshipRequest.findOne({
        where: {
          RequesterId: me.id,
          ResponderId: friend.id,
        },
      })
    },
  },
  Mutation: {
    async signUp(parent, { username, password, email }, { models }) {
      const userExists = await models.User.findOne({
        where: {
          username,
        },
      })
      if (userExists) {
        throw new Error('Username already taken.')
      }
      const user = await models.User.create({
        username,
        password: await bcrypt.hash(password, 10),
        email,
      })

      return jsonwebtoken.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      )
    },
    async login(parent, { username, password }, { models }) {
      const user = await models.User.findOne({ where: { username } })
      if (!user) {
        throw new Error('Haha, fuck you, i dont know you!')
      }
      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Haha, your password sucks!')
      }

      return jsonwebtoken.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      )
    },
    async createWish(
      parent,
      { title, description, imageUrl, price, currency, priority, UserId },
      { models },
    ) {
      return models.Wish.create({
        title,
        description,
        imageUrl,
        price,
        currency,
        priority,
        UserId,
      })
    },
    async deleteWish(parent, { id }, { models }) {
      const wish = await models.Wish.findOne({ where: { id } })
      wish.destroy()
      return true
    },
    async takeWish(parent, { id, GiverId }, { models }) {
      await models.Wish.update(
        { GiverId },
        {
          where: {
            id,
          },
        },
      )
      return models.Wish.findByPk(id)
    },
    async singleUpload(parent, args) {
      const file = await args.file
      const extension = file.filename.split('.').slice(-1)[0]

      const { createReadStream } = file
      const fileStream = createReadStream()

      const id = uuidv4()
      const newFilename = `${id}.${extension}`
      await uploadFile({
        Key: newFilename,
        Body: fileStream,
      })
      return getFileUrl(newFilename)
    },
    async requestFriendship(parent, { ResponderId }, { models, currentUser }) {
      const me = await models.User.findOne({
        where: {
          username: currentUser.username,
        },
      })

      const friendshipRequest = await models.FriendshipRequest.findOne({
        where: {
          RequesterId: me.id,
          ResponderId,
        },
      })

      return (
        friendshipRequest ||
        models.FriendshipRequest.create({
          RequesterId: me.id,
          ResponderId,
          status: 'pending',
        })
      )
    },
    async acceptFriendshipRequest(parent, { id }, { models }) {
      return models.FriendshipRequest.update(
        {
          status: 'accepted',
        },
        {
          where: {
            id,
          },
        },
      )
    },
    async rejectFriendshipRequest(parent, { id }, { models }) {
      return models.FriendshipRequest.update(
        {
          status: 'rejected',
        },
        {
          where: {
            id,
          },
        },
      )
    },
    async deleteFriendshipRequest(parent, { id }, { models }) {
      const friendshipRequest = await models.FriendshipRequest.findOne({
        where: {
          id,
        },
      })
      friendshipRequest.destroy()
      return true
    },
  },
  User: {
    async friends(parent, args, { models }) {
      const friendshipRequests = await models.FriendshipRequest.findAll({
        where: {
          [models.Sequelize.Op.or]: [
            {
              RequesterId: parent.id,
            },
            {
              ResponderId: parent.id,
            },
          ],
          status: 'accepted',
        },
      })
      const friendIds = friendshipRequests.map(friendship => {
        const { RequesterId, ResponderId } = friendship
        if (RequesterId === parent.id) {
          return ResponderId
        }
        return RequesterId
      })
      return models.User.findAll({
        where: {
          id: friendIds,
        },
      })
    },
    async friendshipRequests(parent, { status }, { models, currentUser }) {
      console.log(status)

      return models.FriendshipRequest.findAll({
        where: {
          [models.Sequelize.Op.or]: [
            {
              RequesterId: parent.id,
            },
            {
              ResponderId: parent.id,
            },
          ],
          status,
        },
      })
    },
    async wishes(parent, args, { models }) {
      return models.Wish.findAll({
        where: {
          UserId: parent.id,
        },
      })
    },
    async presents(parent, args, { models }) {
      return models.Wish.findAll({
        where: {
          GiverId: parent.id,
        },
      })
    },
  },
  Wish: {
    async user(parent, args, { models }) {
      return models.User.findByPk(parent.UserId)
    },
    async giver(parent, args, { models }) {
      return models.User.findByPk(parent.GiverId)
    },
  },
  Friendship: {
    async requester(parent, args, { models }) {
      return models.User.findByPk(parent.RequesterId)
    },
    async responder(parent, args, { models }) {
      return models.User.findByPk(parent.ResponderId)
    },
  },
}

module.exports = resolvers
