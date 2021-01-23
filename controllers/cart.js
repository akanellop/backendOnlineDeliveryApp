const Cart = require('../models/cart')
const Order = require('../models/order')
const Product = require('../models/product')


exports.returnUsersCart = (req,res) =>{
    const USERID = req.headers.id.toString();

    Cart.findOne({userID: USERID}).populate('products')
    .then((cart) => {
        res.status(200).json(cart.products);
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

                .then(()=>{res.status(201).json({message:"Succesful insertion."})})

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
                if(order){ //if there is an existing order
                    const updatedOrder = new Order({
                    products:order.products.concat(cart.products),
                    address:cart.address,
                    totalPrice:order.totalPrice + cart.totalPrice
                    });
                
                    Order.updateOne({_id:order._id},updatedOrder)
                    .catch((error)=>{
                        res.status(400).json({
                            error: error
                        });
                    });
                }
                else{  //else create a new one
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
                }
            }).then(()=> {

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



//for testing!!!
exports.returnCarts = (req,res) =>{
    Cart.find().then(
        (products) => {
            res.status(200).json(products);
        }
    ).catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
}


