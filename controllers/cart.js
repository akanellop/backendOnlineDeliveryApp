const Cart = require('../models/cart')

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
