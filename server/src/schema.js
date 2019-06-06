const { gql } = require('apollo-server')

const typeDefs = gql`
type Query {
  users: [User]!
  user(id: ID!): User
  # Queries for the current user
  me: User
}
type Mutation {
  # if false, user registration failed -- check errors
  addUser(userId: ID!): UserUpdateResponse!
  login(email: String): String # login token
}
type UserUpdateResponse {
  success: Boolean!
  message: String
  user: User
}
type User {
  id: ID!
  username: String!
  email: String!
  password: String!
}
`;

module.exports = typeDefs