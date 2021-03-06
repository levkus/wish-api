require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const models = require('../database/models')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const jwt = require('express-jwt')

console.clear()
models.sequelize.authenticate().then(async () => {
  console.log('database connection established')
})

const app = express()
const path = '/api'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      models,
      currentUser: req.user,
    }
  },
})

app.use(
  path,
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    if (err.code === 'invalid_token') {
      res.status(401)
    }
    next()
  },
)

server.applyMiddleware({ app, path })

app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Stay awhile and listen... (${process.env.PORT})`,
  )
})
