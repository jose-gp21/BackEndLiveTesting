const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    costumerId: {type: String, required: true},
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
    },
    quantity: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    total: {type: String, default: "pending"},
    delivery_status: {type: Number, required: true}

}, {timestamps: true});

module.exports = mongoose.model("O", OrderSchema);