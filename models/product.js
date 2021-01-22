const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true}
});

module.exports = mongoose.model('Product',productSchema);