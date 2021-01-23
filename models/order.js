const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product')

const orderSchema = mongoose.Schema({
    products:{type: [{type: mongoose.Schema.Types.ObjectId, ref: Product}], default: []},
    address:{type:String, required:true},
    totalPrice:{type:Number, default: 0}
});

module.exports = mongoose.model('Order', orderSchema);



