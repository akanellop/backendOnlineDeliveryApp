
const Order = require('../models/order');
const Product = require('../models/product');



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


//Functions for menu's products manipulation as the admin/shopOwner
exports.createProduct = (req,res) =>{
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
            message:"Successfull update"
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
            message: 'Deleted'
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


