// class porductos with constructor and methods
const UsuariosDaoFactory = require('../daos/usuarios/UsuariosDaoFactory.js')
const usuariosDao = UsuariosDaoFactory.getDaoUsers()

class UserService {
    constructor() {
        this.usuarios = usuariosDao
    }
    
    // returns all users from DB
    async getAllUsers() {
        console.log('usuariosDAo: ', usuariosDao)
        return await this.usuarios.getAllUsers()
    }
    
    // returns one user by username
    async getUserByUsername(username) {
        return await this.usuarios.getUserByUsername(username)
    }

    // returns one user by id
    async getUserById(id) {
        return await this.usuarios.getUserById(id)
    }

    // returns one user by username & password
    async getUserByUsernameAndPassword(username, password) {
        return await this.usuarios.getUserByUsernameAndPassword(username, password)
    }
    
    // add new user
    async addUser(user) {
        return await this.usuarios.createNewUser(user)
    }
    
    // update one user
    async updateUser(id, user) {
        return await this.usuarios.updateUser(id, user)
    }
    
    // delete one user by Id
    async deleteUserById(id) {
        return await this.usuarios.deleteUserById(id)
    }

    // delete all users from DB
    // async deleteAllUsers() {
    //     return await this.usuarios.getAllUsers()
    // }
}

module.exports = UserService