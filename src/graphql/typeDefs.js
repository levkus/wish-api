const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
    user(id: Int!): User!
    wishes: [Wish!]!
    wish(id: Int!): Wish!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    login(username: String!, password: String!): String!
    createWish(
      title: String!
      description: String
      link: String
      UserId: Int!
    ): Wish!
    takeWish(id: Int!, GiverId: Int!): Wish!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    wishes: [Wish]
    presents: [Wish]
  }

  type Wish {
    id: Int!
    title: String!
    description: String
    imageUrl: String
    user: User!
    giver: User
  }
`
module.exports = typeDefs
