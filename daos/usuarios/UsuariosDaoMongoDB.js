const ContainerMongoDB = require('../../contenedores/usuarios/containerMongoDB.js')

const Usuarios = require('../../models/usuarios.models.js')
const logger = require('../../utils/winston.js')

const crypto = require('crypto')

//const { options } = require('../../options/config.js')
//const connect = require('../../DB/configMongoDB.js')

class UsuariosDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }
    
    async init() {
        await this.connection
   }

   async getAllUsers(){
       try {
           const users = await Usuarios.find()
           console.log('users: ', users)
           if ( users === [] || users === undefined || users === null) {
            return new Error ('No hay usuarios en la DB!')
        } else {
            logger.info(users)
            return users    
        }
        } catch (error) {
            logger.error("Error MongoDB getUsers: ",error)
        }
    }

    async getUserById(id){
        if(id){
            try {
                const user = await Usuarios.findOne( {_id: `${id}`} )
                if ( user === [] || user === undefined || user === null) {
                    return new Error (`El Usuario no existe con ese ID${id}!`)
                } else {
                    logger.info('usuario: ', user)
                    return user    
                }
            } catch (error) {
                logger.error(error)
            }
        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }
    }
    
    async getUserByUsername(username){
        if(username){
            try {
                const user = await Usuarios.findOne( {username: `${username}`} )
                if ( user === [] || user === undefined || user === null) {
                    return new Error (`El Usuario no existe con el username: ${username}`)
                } else {
                    logger.info('usuario ', user)
                    return user    
                }
            } catch (error) {
                logger.error(error)
            }
        } else {
            return new Error (`El Usuario no existe con este username: ${username}!`)
        }
    }
    
    async getUserByUsernameAndPass(username, password) {
        if(username || password) {
            try {
                const user = await Usuarios.findOne( {username: `${username}`, password: `${password}` } )
                if ( user === [] || user === undefined || user === null || password !== user.password ) {
                    return false    
                } else {
                    logger.info('username&pass', username)
                    return true
                }
            } catch (error) {
                logger.error(error)
            }
        } else {
            return new Error (`Usuario no existe o password incorrecto!`)
        }
    }
    
    async createNewUser(usuario) {
        if (usuario) {
            let username = usuario.username || "";
            const password = usuario.password || "";
            username = username.replace(/[!@#$%^&*]/g, "");
    
            if (!username || !password || users[username] ) {
                process.exit(1)
                // return res.sendStatus(400)
            } else {
                try {
                    const salt = crypto.randomBytes(128).toString("base64");
                    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
                    users[username] = { salt, hash }
        
                    const newUser = new Usuarios(usuario)
                    await newUser.save()
                    logger.info('User created: ' + newUser)
                    
                    //////////////////// phone text message //////////////////////
                    const accountSid = process.env.TWILIO_ACCOUNTSID;
                    const authToken = process.env.TWILIO_AUTH_TOKEN;
                    const client = require("twilio")(accountSid, authToken);
                    
                    ;(async () => {
                        try {
                            const message = await client.messages.create({
                                body: `El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente!`,
                                from: '+14094496870',
                                to: '+543541669837'
                            })
                            logger.info(message)
                        } catch (error) {
                            logger.error(error)
                        }
                    })()
                    
                    //////////////////// gmail //////////////////////
                    const { createTransport } = require('nodemailer')
                    const TEST_EMAIL = process.env.TEST_EMAIL
                    const PASS_EMAIL = process.env.PASS_EMAIL
                    
                    const transporter = createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: TEST_EMAIL,
                            pass: PASS_EMAIL
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
                    
                    const mailOptions = {
                        from: 'Servidor NodeJS - @Gmail - Ecommerce - German Montalbetti (C)2023',
                        to: TEST_EMAIL,
                        subject: 'Mail de Registro nuevo Usuario desde NodeJS - @Gmail - Ecommerce - German Montalbetti (C)2023',
                        html: `<h3 style="color: green;">El usuario ${newUser.name} ${newUser.lastName}, se registro exitosamente en la base de datos!</h3>`,
                        attachments: [
                            {
                                path: 'https://res.cloudinary.com/hdsqazxtw/image/upload/v1600707758/coderhouse-logo.png'
                            }
                        ]
                    }
                    
                    ;(async () => {
                        try {
                            const info = await transporter.sendMail(mailOptions)
                            logger.info(info)
                        } catch (err) {
                            logger.error(err)
                        }
                    })()
                    
                } catch (error) {
                    logger.error(error)
                    return new Error (`No se pudo crear el Usuario!`)
                }
            }   
        } else {
            return new Error (`No se pudo crear el Usuario!`)
        }
    }

    async updateUser(id, user){
        const userMongoDB = await Usuarios.findById({_id: id})
        console.log('userMongoDB (to be updated): ', userMongoDB)
        
        if (userMongoDB) {
            try {
                 const newValues = {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    password: userMongoDB.password,
                    admin: userMongoDB.admin
                }
                console.log('newValues (update): ',newValues)
                const userUpdated = await Productos.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
    
                logger.info('Usuario actualizado ', userUpdated)
                
                return userUpdated
               
            } catch (error) {
                logger.error("Error MongoDB updateUser: ", error)
                return new Error (`No se pudo actualizar el Usuario!`)
            }
        } else {
            logger.info('El Ususario no existe! ', userMongoDB)
            return new Error (`No se pudo actualizar el Usuario!`)
        }
    }

    async deleteUserById(id) {
        if(id){
            const userMongoDB = await Usuarios.findById({_id: `${id}`})
            console.log('userMongoDB (deleted): ', userMongoDB)
            if(userMongoDB) {
                try {
                    const user = await Usuarios.findByIdAndDelete({_id: id})
                    console.log('Usuario encontrado y eliminado: ', user)
                    return user
                } catch (error) {
                    logger.error("Error MongoDB deleteUser: ",error)
                }
            } else {
                logger.info('El Usuario no existe! ', id)
                console.log(`El Usuario no existe con ese Id: ${id}!`)
                return new Error (`El Usuario no existe con ese Id: ${id}!`)
            }
        } else {
            return new Error (`El Usuario no existe con ese ID${id}!`)
        }    
    }

    async disconnet() {
        await this.disconnection
    }
}

module.exports = UsuariosDaoMongoDB 