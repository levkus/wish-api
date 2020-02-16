const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    me: User
    users(subString: String!): [User!]!
    user(username: String!): User!
    wish(id: Int!): Wish!
    friendshipStatus(username: String!): Friendship
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
    requestFriendship(ResponderId: Int!): Friendship!
    acceptFriendshipRequest(id: Int!): Friendship!
    rejectFriendshipRequest(id: Int!): Friendship!
    deleteFriendshipRequest(id: Int!): String!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    wishes: [Wish]
    presents: [Wish]
    friendshipRequests(status: String!): [Friendship]
    friends: [User]
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

  type Friendship {
    id: Int!
    requester: User!
    responder: User!
    status: String!
  }
`
module.exports = typeDefs
