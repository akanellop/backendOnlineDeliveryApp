const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('Have received a request');
    next();
});

app.use((req,res,next)=>{
    res.status(201);
    next();
});

app.use((req,res,next)=> { //instead of .end we can send .json to return json object this is allowed from express
    res.json({message:'your request was successful'})
    next();
});

app.use((req,res,next)=> { 
    console.log('Response sent with success');
});


module.exports = app;