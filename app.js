//MONGODB Username admin
//MONDODB Pass 1WxzRfsFepaRkCT8
//MONGODB Connection mongodb+srv://admin:<password>@cluster0.prwve.mongodb.net/<dbname>?retryWrites=true&w=majority

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const clientViewRoutes = require('./routes/client/view');
const clientCartRoutes = require('./routes/client/cart');
const ownerRoutes = require('./routes/shopOwner');
const userRoutes = require('./routes/user');

//----------------------------------
//Establishing a connection with the MongoDB cluster
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

app.use('/api/shop/menu', clientViewRoutes);
app.use('/api/shop/cart', clientCartRoutes);
app.use('/api/admin',ownerRoutes);
app.use('/api/auth',userRoutes);



module.exports = app;