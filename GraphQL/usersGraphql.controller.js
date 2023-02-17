const UsersService = require("../GraphQL/usersGraphql.service.js")
const crypto = require('crypto')
const usuariosMap = {}
const { Usuario } = require("../GraphQL/Usuarios.modelos.js")

class UsersController {  
    constructor(){
        this.users = new UsersService()
      }
    
      getAllUsers({ campo, valor }) {
        const usuarios = Object.values(usuariosMap)
        if (campo && valor) {
            return usuarios.filter(p => p[ campo ] == valor);
        } else {
            return usuarios;
        }
    }

    getUserById({ id }) {
        if (!usuariosMap[ id ]) {
            throw new Error('Usuario not found.');
        }
        return usuariosMap[ id ];
    }

    getUserByUsername({ name }) {
        if (!usuariosMap[ name ]) {
            throw new Error('Usuario not found.');
        }
        return usuariosMap[ name ];
    }

    createNewUser({ datos }) {
        const id = crypto.randomBytes(10).toString('hex');
        const nuevoUsuario = new Usuario(id, datos)
        usuariosMap[ id ] = nuevoUsuario;
        return nuevoUsuario;
    }

    updateUser({ id, datos }) {
        if (!usuariosMap[ id ]) {
            throw new Error('Usuario not found');
        }
        const usuarioActualizado = new Usuario(id, datos)
        usuariosMap[ id ] = usuarioActualizado;
        return usuarioActualizado;
    }

    deleteUserById({ id }) {
        if (!usuariosMap[ id ]) {
            throw new Error('Usuario not found');
        }
        const usuarioBorrado = usuariosMap[ id ]
        delete usuariosMap[ id ];
        return usuarioBorrado;
    }
}

module.exports = { UsersController }