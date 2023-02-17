const { Router } = require('express')
const routerProductos = Router()
const { authMiddleware } = require('../middlewares/auth.middleware.js')
const { checkAuthentication } = require('../middlewares/chekAuthentication.js')

const GetProducts = require('../controllers/productos.controller.js')
const getProducts = GetProducts.ProductsController
const products = new getProducts()

// const serverMongoDB = require('../usuarios/userMongoDB')  //  ../daos/usuarios/UsuariosDaoMongoDB.js
// const constructor = serverMongoDB.ServerMongoDB
// const server = new constructor()

// -------------------  Seleccionar todos los Producto ------------------
routerProductos.get('/', checkAuthentication, products.getAllProducts)

// -------------------  Seleccionar Producto por Id ------------------ 
routerProductos.get('/:id', checkAuthentication, products.getProductById)

// -------------------  Crear Nuevo Producto ------------------------ 
routerProductos.post('/', checkAuthentication, products.createNewProduct)

// -------------------  Actualizar Producto por Id ------------------ 
routerProductos.post('/:id', checkAuthentication, products.updateProduct)

// -------------------  Eliminar Producto por Id ------------------ 
routerProductos.get('/delete/:id', checkAuthentication, products.deleteProductById)

module.exports = routerProductos