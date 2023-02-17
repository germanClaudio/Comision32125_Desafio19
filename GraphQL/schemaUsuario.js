const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type User {
    id: String
    name: String
    lastName: String
    email: String
    username: String
    password: String
  },

  input UserInput {
    name: String
    lastName: String
    email: String
    username: String
    password: String
  },

  type Query {
    getUserById(id: String): User
    getUserByName(username: String): User
    getAllUsers(campo: String, valor: String): [User]
  },

  type Mutation {
    createNewUser(datos: UserInput): User
    updateUser(id: String, datos: UserInput): User,
    deleteUser(id: String): User,
  }
`)

module.exports = { schema }
