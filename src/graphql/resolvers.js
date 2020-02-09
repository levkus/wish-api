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
    async users(parent, args, { models }) {
      return models.User.findAll()
    },
    async user(parent, { username }, { models }) {
      return models.User.findOne({ where: { username } })
    },
    async wishes(parent, args, { models }) {
      return models.Wish.findAll()
    },
    async wish(parent, { id }, { models }) {
      return models.Wish.findByPk(id)
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
  },
  User: {
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
}

module.exports = resolvers
