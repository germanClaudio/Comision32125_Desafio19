// class porductos with constructor and methods
const ProductosDaoFactory = require('../daos/productos/ProductosDaoFactory.js')

// const idGenerator = {
//     id: 1,
//     next() { return this.id++ }
// }

const productosDao = ProductosDaoFactory.getDao()

class ProductService {
    constructor() {
        this.productos = productosDao
    }
    
    // returns all products from DB
    async getAllProducts() {
        return await this.productos.getAllProducts()
    }
    
    // returns one product by id
    async getProductById(id) {
        return await this.productos.getProductById(id)
    }
    
    // add new product
    async addProduct(product) {
        return await this.productos.createNewProduct(product)
    }
    
    // update one product
    async updateProduct(id, producto) {
        return await this.productos.updateProduct(id, producto)
    }
    
    // delete one product by Id
    async deleteProductById(id) {
        return await this.productos.deleteProductById(id)
    }

    // delete all products
    deleteAllProducts() {
        return this.productos.getAllProducts()
    }
}

module.exports = ProductService