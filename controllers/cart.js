const Cart = require('../models/cart')
const Order = require('../models/order')
const Product = require('../models/product');
const cur = require('../services/getCurrencyRate');


exports.returnUsersCart = (req,res) =>{
    const USERID = req.headers.id.toString();
    const CURRENCY = req.headers.cur.toString();
    
    Cart.findOne({userID: USERID}).populate('products')
    .then((cart) => {
        if(CURRENCY){
            cur.getNewCurrencyRate(CURRENCY).then( rate =>{
                cart.totalPrice *= rate;
                res.status(200).json(cart);
            })
        }
        else{
            res.status(200).json(cart);
        }
    })
    .catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
}

exports.putProductInCart = (req,res) =>{
    const USERID = req.headers.id.toString();
    const PRODUCTID =  req.params.id.toString();
    Cart.findOne({userID: USERID})
    .then(
        (cart) => {
            Product.findOne({_id: PRODUCTID})
            .then((product) =>{
                var updatedProducts = cart.products;
                updatedProducts.push(product)
                
                var updatedPrice = cart.totalPrice+product.price;

                Cart.updateOne({_id:cart._id},
                    {$set: {_id: cart._id,products: updatedProducts,address: cart.address,
                        userID: cart.userID, totalPrice: updatedPrice}},{upsert: true})

                .then(()=>{res.status(201).json({message:"Product added succesfully."})})

                .catch((error)=>{
                    res.status(400).json({error: error});
                })
            })
        })
}

exports.submitOrder = (req,res) =>{
    const USERID = req.headers.id.toString();
    Cart.findOne({userID: USERID })
    .then(
        (cart) => {
            Order.findOne({userID: USERID})
            .then((order)=>{
                 //Create new order
                 const newOrder = new Order({
                     products:cart.products,
                     address:cart.address,
                     totalPrice:cart.totalPrice,
                    });
                newOrder.save()
                .catch((error)=>{
                    res.status(400).json({
                        error: error
                    });
                });
                
            }).then(()=> {
                //Empty user's cart 
                Cart.updateOne({_id:cart._id},
                    {$set: {_id: cart._id, products: [], address: cart.address,
                         userID: cart.userID, totalPrice: 0}},{upsert: true})
                .then(()=>{
                    res.status(201).json({
                        message:"Succesful submit."
                    });
                }).catch((error)=>{
                    res.status(400).json({
                        error: error
                    });
                });
            })
            
        })
        .catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
}

