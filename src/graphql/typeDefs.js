const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
    user(username: String!): User!
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
      imageUrl: String
      UserId: Int!
    ): Wish!
    deleteWish(id: Int!): Boolean!
    takeWish(id: Int!, GiverId: Int!): Wish!
    singleUpload(file: Upload!): String!
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
    price: String
    currency: String
    priority: Int
    user: User!
    giver: User
    createdAt: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`
module.exports = typeDefs
