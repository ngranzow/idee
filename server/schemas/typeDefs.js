const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    idees: [Idee]
    friends: [User]
  }

  type Idee {
    _id: ID
    ideeText: String
    createdAt: String
    username: String
    replyCount: Int
    replys: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    idees(username: String): [Idee]
    idee(_id: ID!): Idee
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addIdee(ideeText: String!): Idee
    addReply(ideeId: ID!, replyBody: String!): Idee
    addFriend(friendId: ID!): User
  }
`;


module.exports = typeDefs;