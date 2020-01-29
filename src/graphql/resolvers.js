const resolvers = {
  Query: {
    async users(parent, args, { models }) {
      return models.User.findAll()
    },
    async user(parent, { id }, { models }) {
      return models.User.findByPk(id)
    },
    async wishes(parent, args, { models }) {
      return models.Wish.findAll()
    },
    async wish(parent, { id }, { models }) {
      return models.Wish.findByPk(id)
    },
  },
  Mutation: {
    async createUser(parent, { username, password, email }, { models }) {
      return models.User.create({
        username,
        password,
        email,
      })
    },
    async createWish(
      parent,
      { title, description, imageUrl, UserId },
      { models },
    ) {
      return models.Wish.create({
        title,
        description,
        imageUrl,
        UserId,
      })
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
  },
  Wish: {
    async user(parent, args, { models }) {
      return models.User.findByPk(parent.UserId)
    },
  },
}

module.exports = resolvers
