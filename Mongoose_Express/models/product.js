const mongoose = require('mongoose');  //no need to connect to MongoDB here bc this file will be required in index.js where connecting will be done there

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product; //export from this file so it can be used somewhere else