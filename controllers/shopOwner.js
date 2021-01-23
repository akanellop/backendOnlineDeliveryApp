const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart')



exports.returnSubmittedOrders = (req,res) =>{
    Order.find()
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}


exports.createProduct = (req,res) =>{
        console.log("here")
    const product = new Product({
        name:req.body.name,
        category:req.body.category,
        price:req.body.price
    });
    product.save().then(
        ()=>{
            res.status(201).json({
                message:"Created new product."
            })
        }
    ).catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
};

exports.updateProduct = (req,res) => {
    const product = new Product({
        _id:req.params.id,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price
    });

    Product.updateOne({_id:req.params.id},product).then(()=>{
        res.status(201).json({
            message:"update succeed"
        });
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}

exports.deleteProduct = (req,res) => {
    Product.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}


//for testing and implementation 

exports.returnUsers = (req,res) =>{
    User.find().then(
        (products) => {
            res.status(200).json(products);
        }
    ).catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
}

exports.deleteEverything = (req,res) =>{
    User.deleteMany()
    .catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
    

    Cart.deleteMany()
    .catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
    Product.deleteMany()
    .catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
    Order.deleteMany()
    .then(res.status(200).json({message:'all good'}))
    .catch((error)=>{
        res.status(400).json({
            error: error
          });
    });

}

