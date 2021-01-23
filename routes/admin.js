const express = require('express');
const router = express.Router();

//const cartCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const adminCtrl = require('../controllers/admin')


//----------------------------------
//API routes handling
//----------------------------------

//cRud
//router.get('/orders', auth, adminCtrl.returnOrders); // will rerutn all submitted carts
router.get('/users', auth, adminCtrl.returnUsers); // will rerutn all submitted carts


module.exports = router;