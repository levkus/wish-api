const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: Int!): User!
    wishes: [Wish!]!
    wish(id: Int!): Wish!
  }

  type User {
    id: Int!
    username: String!
    password: String!
    wishes: [Wish]
  }

  type Wish {
    id: Int!
    title: String!
    description: String
    user: User!
  }
`
module.exports = typeDefs
