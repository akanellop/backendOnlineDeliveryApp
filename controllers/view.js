
const Product = require('../models/product');

exports.viewInventory = (req,res) =>{
    Product.find()
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}


exports.viewCategory = (req,res) =>{
    const CATEGORY = req.params.CATEGORY.toString();

    Product.find({category:CATEGORY})
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}