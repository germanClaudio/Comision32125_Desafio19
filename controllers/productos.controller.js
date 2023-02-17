const ProductosService = require("../services/products.service.js")

class ProductsController {  
    constructor(){
        this.products = new ProductosService()
    }

    getAllProducts = async (req, res) => {
        const productos = await this.products.getAllProducts()
        try {
            if(productos.error) return res.status(400).json({msg: 'No hay productos cargados'}) 
            res.status(200).json({ Data: productos })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getAllProducts',
                error: error
            })
        }
    }


    getProductById = async (req, res) => {
        const { id } = req.params
        const producto = await this.products.getProductById(id)
        try {
            if(!producto) return res.status(404).json({msg: 'Producto no encontrado'})
            res.status(200).json({ Data: producto })
            //res.render('productDetails', { producto })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - getProductById',
                error: error
            })
        }
    }

    createNewProduct = async (req, res) => {
        const producto = await this.products.addProduct(req.body)
        console.log('productoController: ', producto)
        try {
            if(!producto) return res.status(404).json({Msg: 'Producto no guardado'})
            res.status(200).json({ Data: producto })
        } catch (error) {
            res.status(500).json({
                status: false,
                msg: 'controllerError - createNewProducts',
                error: error
            })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const productUpdated = await this.products.updateProduct(req.params.id, req.body)
            res.status(200).json(productUpdated)
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteProductById = async (req, res) => {
        const { id } = req.params
        console.log(id)
        try {
            const productDeleted = await this.products.deleteProductById(req.params.id)
            res.status(200).json(productDeleted)
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })
        }
    }

    deleteAllProducts = async (req, res) => {
        try {
            const deleted = await this.products.deleteAllProducts()
            res.status(200).json(deleted)
        } catch (error) {
            res.status(500).json({
                status: false,
                error: error
            })    
        }
    }
}

module.exports = { ProductsController }