// class porductos with constructor and methods
const Carritos = require('../daos/carritos/CarritosDaoMongoDB')

class CartService {
    constructor() {
        this.carritos = new Carritos()
    }
    
    // returns all product from a Cart
    async getCart(id) {
        return this.carritos.getCart(id)
    }
    
    // add new product to a cart
    async addItemToCart(payload) {
        return this.carritos.addItemToCart(payload)
    }
    
    // update one product
    // async updateProduct(id, producto) {
    //     return this.carritos.updateProduct(id, producto)
    // }
    
    // Empty one cart by Id
    async emptyCart(id) {
        return this.carritos.emptyCart(id)
    }

}

module.exports = CartService
