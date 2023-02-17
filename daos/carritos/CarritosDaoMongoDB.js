//CarritosDaoMongo aqui---------------------------NO PRODUCTOS!!!! -----
const ContenedorMongoDB = require('../../contenedores/productos/containerMongoDB.js')
const { options } = require('../../options/config.js')

const Carritos = require('../../models/carritos.models.js')
const Productos = require('../../models/productos.models.js') 
const logger = require('../../utils/winston.js')

// const { ProductosDto } = require('../../dto/productosDto')
// const { Cotizador } = require('../../utils/cotizador')

// const currency = process.env.CURRENCY

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(options.mongoDB.connection.URL)
        // this.cotizador = new Cotizador()
    }
    
    async getCart() {
            try {
                const carts = await Carritos.find()
                .populate({   
                    path: 'items.productId',
                    select: "name description total quantity"
                })  
                logger.info('Carrito encontrado: ',carts)
                return carts[0]
            } catch (error) {
                logger.error("Error MongoDB getCart: ",error)
            }
    }   


    async addItemToCart(payload){
        const infoId = payload.items[0]
        const productId = infoId.productId
        
        try {
            // -------------- Validaciones producto ----------------------
            const itemMongoDB = await Productos.findOne({_id: `${productId}`})
            
            if (itemMongoDB) {
                const newItem = await Carritos.create(payload);
                console.log('Product', itemMongoDB._id ,'added to the Cart id#: ', newItem.items)
                return newItem
                
            } else {
                logger.info('No se puede agregar Producto a Cart o el Producto no existe!')
            }

        } catch (error) {
            logger.error("Error MongoDB adding Product to cart: ",error)
        }
    }

    async updateCart(id, producto){
        const itemMongoDB = await Productos.findOne({_id: id})
        console.log('itemMongoDB (update): ',itemMongoDB)
        if (itemMongoDB) {
            try {
                 const newValues = {
                    name: producto.name,
                    description: producto.description,
                    price: producto.price,
                    code: producto.code,
                    picture: producto.picture,
                    stock: producto.stock,
                    timestamp: producto.timestamp,
                    category: producto.category
                }
                console.log('newValues (update): ',newValues)
                const productUpdated = await Carritos.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
    
                logger.info('Producto actualizado ', productUpdated)
                
                return productUpdated
               
            } catch (error) {
                logger.error("Error MongoDB updateProduct: ",error)
            }
        } else {
            logger.info('El Producto no existe! ', itemMongoDB)
        }
    }

    async emptyCart(id){
        try {
            const productDeleted = await Carritos.findByIdAndUpdate(id)
            logger.info('Carrito vaciado" ' + productDeleted)
            return productDeleted
        } catch (error) {
            logger.error("Error MongoDB deleteProduct: ",error)
        }
    }

    async desconectar() {
    }
}

module.exports = CarritosDaoMongoDB