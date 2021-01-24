const mongoose = require('mongoose');

const Product = require('./product')

const cartSchema = mongoose.Schema({
    userID:{type: String,required:true},
    products:{type: [{type: mongoose.Schema.Types.ObjectId, ref: Product}], default: []},
    address:{type:String, required:true},
    totalPrice:{type:Number, default: 0}
});

module.exports = mongoose.model('Cart', cartSchema);



