
const Product = require('../models/product');
const cur = require('../services/getCurrencyRate');

exports.viewInventory = (req,res) =>{
    const CURRENCY = req.headers.cur.toString();

    Product.find()
    .then((products) => {
        if(CURRENCY){
            cur.getNewCurrencyRate(CURRENCY).then( rate =>{
                products.forEach((product) => {
                    product.price *= rate;
                });
                res.status(200).json(products);
            })
        }
        else{
            res.status(200).json(products);
        }
        
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}


exports.viewCategory = (req,res) =>{
    const CATEGORY = req.params.category;
    const CURRENCY = req.headers.cur.toString();

    Product.find({category:CATEGORY})
    .then((products) => {
        
        if(CURRENCY){
            cur.getNewCurrencyRate(CURRENCY).then( rate =>{
                products.forEach((product) => {
                    product.price *= rate;
                });
                res.status(200).json(products);
            })
        }
        else{
            res.status(200).json(products);
        }
        
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });

}

exports.viewProduct = (req,res) =>{
    const PRODUCTID= req.params.id;
    const CURRENCY = req.headers.cur.toString();

    Product.findOne({_id:PRODUCTID})
    .then((product) => {
        if(CURRENCY){
            cur.getNewCurrencyRate(CURRENCY).then( rate =>{
                product.price *= rate;
                res.status(200).json(product);
            })
        }
        else{
            res.status(200).json(product);
        }
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}