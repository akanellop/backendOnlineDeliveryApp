const User = require('../models/user')

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
