const { options } = require("../options/config.js")
const connection = require("../DB/configMongoDB")
const logger = require('../utils/winston')

const ContainerMessages = require("../daos/mensajes/MensajesDaoMongoDB.js") //../contenedores/containerMessages.js
const containerMsg = new ContainerMessages(options.mongoDB.connection.URL) //options.filePath.pathMsg

const ContainerProducts = require("../daos/productos/ProductosDaoFactory") //ProductosDaoMongoDB.js")  //../daos/productos/ProductosDaoArchivo.js
const containerProduct = new ContainerProducts(connection) //options.mongoDB.connection.URL //options.filePath.path

const { schema } = require("normalizr");

const initSocket = (io) => {
  io.on("connection", async (socket) => {
        logger.info("Nuevo cliente conectado!")
        
        // --------------------------  Products --------------------------------
         
        socket.emit('productsAll', await containerProduct.getAllProducts()) //getCotizacionEnDolares() )  //getAllProducts() 
        
        socket.on('newProducto', async (producto) => {
            logger.info('Data servidor: ' + producto)
            await containerProduct.createProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })
        
        socket.on('updateProducto', async (producto) => {
            await containerProduct.updateProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })
        
        socket.on('deleteProducto', async (producto) => {
            await containerProduct.deleteProduct(producto)
            io.sockets.emit('productsAll', await containerProduct.getCotizacionEnDolares())
        })
        // ------------------------- Show Only One Product -------------------------------
        
        socket.on('showSearchProduct', async (producto) => {
            //logger.info('Data servidor showOneProducto: ', producto)
            const item = await containerProduct.getByNameOrCode(producto)
            if(item !== undefined){
                io.sockets.emit('showSelecProd',
                    await containerProduct.getCotizacionEnDolares(item._id))
            } else {
                io.sockets.emit('showSelecProd',
                    await containerProduct.getCotizacionEnDolares())
            }
        })

    // -----------------------------  Messages ---------------------------------
        // const normalizarMensajes = (mensajesConId) =>
        // normalize(mensajesConId, schemaMensajes)

        async function listarMensajesNormalizados() {
            const mensajes = await containerMsg.getAllMessages();
            //console.log('listarMensajesNormal: ',mensajes)
            // const normalizados = normalizarMensajes({ mensajes }); //id: "mensajes",
            
            return mensajes//normalizados;
            }

        // NORMALIZACIÓN DE MENSAJES
        // Definimos un esquema de autor
        const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" } );
        // Definimos un esquema de mensaje
        const schemaMensaje = new schema.Entity("post", { author: schemaAuthor }, { idAttribute: "id" });
        // Definimos un esquema de posts
        const schemaMensajes = new schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });

        socket.emit("mensajesAll", await listarMensajesNormalizados()); //containerMsg.getAllMsg() )

        socket.on("newMensaje", async (message) => {
        message.fyh = new Date().toLocaleString()
        await containerMsg.createMessage(message) //mensajesApi.addMessage(mensaje)
        io.sockets.emit("mensajesAll", await listarMensajesNormalizados())
        })
    
        socket.on('disconnect', () => {
            logger.info(`User desconectado`)
        })
    })
}

module.exports = initSocket