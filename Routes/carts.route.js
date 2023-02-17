const { Router } = require('express')
const routerCarritos = Router()
const { authMiddleware } = require('../middlewares/auth.middleware')
const { checkAuthentication } = require('../middlewares/chekAuthentication')

const GetCarts = require('../controllers/cart.controller')
const getCarts = GetCarts.CartsController
const carts = new getCarts()

// const serverMongoDB = require('../usuarios/userMongoDB')  //  ../daos/usuarios/UsuariosDaoMongoDB.js
// const constructor = serverMongoDB.ServerMongoDB
// const server = new constructor()

// -------------------  Seleccionar Carrito por Id ------------------ 
routerCarritos.get('/:id', checkAuthentication, carts.getCart) 

// -------------------  Agregar Producto al carrito ------------------ 
routerCarritos.post('/', checkAuthentication, carts.addItemToCart)

// -------------------  Eliminar Producto por Id ------------------ 
routerCarritos.get('/empty-cart/:id', checkAuthentication, carts.emptyCart)

module.exports = routerCarritos