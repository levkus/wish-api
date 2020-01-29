const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: Int!): User!
    wishes: [Wish!]!
    wish(id: Int!): Wish!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createWish(
      title: String!
      description: String
      link: String
      UserId: Int!
    ): Wish!
  }

  type User {
    id: Int!
    username: String!
    password: String!
    email: String!
    wishes: [Wish]
  }

  type Wish {
    id: Int!
    title: String!
    description: String
    imageUrl: String
    user: User!
  }
`
module.exports = typeDefs
