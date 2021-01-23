const Product = require('../models/product');

exports.createProduct = (req,res) =>{
    const product = new Product({
        name:req.body.name,
        description:req.body.description,
        quantity:req.body.quantity,
        price:req.body.price
    });
    product.save().then(
        ()=>{
            res.status(201).json({
                message:"succeeded"
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
        description:req.body.description,
        quantity:req.body.quantity,
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

exports.returnProducts = (req,res) =>{
    Product.find().then(
        (products) => {
            res.status(200).json(products);
        }
    ).catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
}


