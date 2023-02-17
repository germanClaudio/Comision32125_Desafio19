const { Schema, model, mongoose } = require('mongoose')

let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamp: {
        type: Date,
        default: () => new Date(new Date())
    }
})
const cartSchema = new Schema({
    items: [ItemSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamp: {
        type: Date,
        default: () => new Date(new Date())
    }  
})

module.exports = model('Carts', cartSchema)