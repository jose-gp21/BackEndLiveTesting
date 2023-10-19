const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    tittle: {type: String, require: true},
    supplier: {type: String, require: true},
    price: {type: String, require: true},
    imageURL: {type: String, require: true},
    description: {type: String, require: true},
    product_location: {type: String, require: true},

}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);