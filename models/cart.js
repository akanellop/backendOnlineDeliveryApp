const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product')

const cartSchema = mongoose.Schema({
    userID:{type: {mongoose.Schema.Types.ObjectId, ref: User}, required:true},
    products:{type: [{type: mongoose.Schema.Types.ObjectId, ref: Product}], default: []},
    adress:{type:String, required:true},
    totalPrice:{type:Number, default: 0},
    submitted:{type:Boolean, default: false}
});

module.exports = mongoose.model('Product',productSchema);



