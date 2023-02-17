//MensajessDaoMongo aqui---------------------------NO PRODUCTOS!!!! -----
const ContainerMongoDB = require('../../contenedores/productos/containerMongoDB.js')
const Mensajes = require('../../models/mensajes.models.js')

const { options } = require('../../options/config.js')
const logger = require('../../utils/winston.js')

class MensajesDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)  //connect.dbConnection()
    }
    
    async getAllMessages(){
        try {
            const messages = await Mensajes.find()
            //console.log('mensajes desde getAllMsg: ',messages)
            // logger.info(messages)
            if(messages.length > 0){
                return messages
            }else{
                logger.info('No messages found')
            }
        } catch (error) {
            logger.error(error)
        }
    }
    
    async createMessage(mensaje){
        try {
            const newMessage = new Mensajes(mensaje)
            await newMessage.save()
            logger.info('Message created: ' + newMessage)
            return newMessage
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = MensajesDaoMongoDB 