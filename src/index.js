require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { sequelize } = require('../models/index')
const models = require('../models')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

console.clear()
sequelize.authenticate().then(() => {
  console.log('database connection established')
})

const server = new ApolloServer({ typeDefs, resolvers, context: { models } })
const app = express()

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Stay awhile and listen... (${process.env.PORT})`,
  )
})
