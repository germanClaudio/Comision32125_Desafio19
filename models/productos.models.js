const { Schema, model } = require('mongoose')

const ProductoSchema = new Schema({
    timestamp: {
        type: String,
		default: Date.now().toLocaleString('en-GB')
    },
    name: {
        type: String,
        // required: true,
        maxlength: 100,
        value: 'Perfume '
    },
    description: {
        type: String,
        maxlength: 100
    },
    price: {
        type: Number,
        // required: true,
        value: 1,
        maxlength: 100,
        min: [1, 'Price can not be less than 1.']
    },
    picture: { 
        type: String,
        // required: true,
        maxlength: 500,
        value: 'Picture not found'
    },
    code:{
        type: String,
        // required: true,
        maxlength: 5,
        unique: true,
        value: 'AA01'
    },
    stock:{
        type: Number,
        maxlength: 100,
        min: [0, 'Stock can not be less than 0.'],
        // required: true,
        value: 1
    },
    category:{
        type: String,
        default: 'Perfumes',
        maxlength: 50
    }
    
},{
    versionKey: false
})

module.exports = model('Products', ProductoSchema)