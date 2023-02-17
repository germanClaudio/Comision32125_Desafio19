class Usuario {
    constructor(id, { name, lastName, email, username, password }) {
        this.id = id
        this.name = name
        this.lastName = lastName
        this.email = email
        this.username = username
        this.password = password
    }
}

module.exports = { Usuario }
