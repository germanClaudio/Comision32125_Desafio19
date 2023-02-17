const UsuariosService = require("../services/users.service.js")

class UsersController {  
    constructor(){
        this.users = new UsuariosService()
      }
        
    getAllUsers = async (req, res) => {
        const usuarios = await this.users.getAllUsers()
        console.log('usuarios: ', usuarios)
        try {
            if(usuarios.error) return res.status(400).json({msg: 'No hay usuarios cargados!'}) 
            res.status(200).json({ Data: usuarios })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllUsers',
                error: error
            })
        }
    }


    getUserById = async (req, res) => {
        const { id } = req.params
        const usuario = await this.users.getUserById(id)
        try {
            if(!usuario) return res.status(404).json({msg: 'Usuario no encontrado'})
            res.status(200).json({ Data: usuario })
            //res.render('productDetails', { producto })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserById',
                error: error
            })
        }
    }

    getUserByUsername = async (req, res) => {
        const { username } = req.params
        const usuario = await this.users.getUserByUsername(username)
        try {
            if(!usuario) return res.status(404).json({msg: 'Usuario no encontrado'})
            res.status(200).json({ Data: usuario })
            //res.render('productDetails', { producto })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserByusername',
                error: error
            })
        }
    }

    getUserByUsernameAndPassword = async (req, res) => {
        const { username } = req.params
        const { password } = req.body
        const usuario = await this.users.getUserByUsernameAndPassword(username, password)
        try {
            if(!usuario) return res.status(404).json({msg: 'Username desconocido o password incorrecto!!'})
            res.status(200).json({ Data: usuario })
            //res.render('productDetails', { producto })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getUserByUsername',
                error: error
            })
        }
    }

    createNewUser = async (req, res) => {
        const usuario = await this.users.addUser(req.body)
        
        try {
            if(!usuario) return res.status(404).json({Msg: 'No se pudo guardar usuario!'})
            res.status(200).json({ Data: usuario })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - createNewUser',
                error: error
            })
        }
    }

    updateUser = async (req, res) => {
        const { id } = req.params
        const userToUpdate = req.body
        try {
            const userUpdated = await this.users.updateUser(id, userToUpdate)
            res.status(200).json(userUpdated)
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteUserById = async (req, res) => {
        const { id } = req.params
        try {
            const userDeleted = await this.users.deleteUserById(id)
            res.status(200).json(userDeleted)
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    // deleteAllUsers = async (req, res) => {
    //     try {
    //         const deleted = await this.users.deleteAllusers()
    //         res.status(200).json(deleted)
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             error: error
    //         })    
    //     }
    // }
}

module.exports = { UsersController }