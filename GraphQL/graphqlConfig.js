const {schema} = require('../GraphQL/schemaUsuario.js')
const usersGraphController = require('../GraphQL/usersGraphql.controller.js')

const controller = usersGraphController.UsersController
const controllerUsers = new controller

const configGraphQL = {
    schema: schema,

    rootValue: {
        getAllUsers: controllerUsers.getAllUsers,
        getUserById: controllerUsers.getUserById,
        getUserByUsername: controllerUsers.getUserByUsername,
        createNewUser: controllerUsers.createNewUser,
        updateUser: controllerUsers.updateUser,
        deleteUserById: controllerUsers.deleteUserById
    },

    graphiql: true,
}

module.exports = configGraphQL