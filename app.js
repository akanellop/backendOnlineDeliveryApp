//MONGODB Username admin
//MONDODB Pass 1WxzRfsFepaRkCT8
//MONGODB Connection mongodb+srv://admin:<password>@cluster0.prwve.mongodb.net/<dbname>?retryWrites=true&w=majority


const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

//----------------------------------
//Establishing a conection with the MongoDB clsuter
//----------------------------------

const app = express();
mongoose.connect('mongodb+srv://admin:1WxzRfsFepaRkCT8@cluster0.prwve.mongodb.net/<dbname>?retryWrites=true&w=majority')
        .then(()=>{
            console.log("Connected in MongoDb Atlas");
        }).catch((error)=>{
            console.log(error)
        });


//----------------------------------
//Initializing headers' preferences for avoiding CORS errors and json manipulation
//----------------------------------

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); //allow everyone that tries to access
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //allow every header type of http
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //allow every http method
    next();
  });

app.use(bodyParser.json());


//----------------------------------
//API routes handling
//----------------------------------

// Crud
app.post('/api/deliveryapp', (req, res, next) => {

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
  });

  //crUd
app.put('/api/deliveryapp/:id',(req,res,next)=>{
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
        
});


//cruD
app.delete('/api/deliveryapp/:id', (req, res, next) => {
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
  });



//cRud
app.use('/api/deliveryapp',(req,res,next)=>{

    Product.find().then(
        (products) => {
            res.status(200).json(products);
        }
    ).catch((error)=>{
        res.status(400).json({
            error: error
          });
    });
});




module.exports = app;