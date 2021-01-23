const express = require('express');
const router = express.Router();

const cartCtrl = require('../controllers/cart');
const auth = require('../middleware/auth');


//----------------------------------
//API routes handling
//----------------------------------

// Crud
//router.post('/submit',auth, cartCtrl.makeOrder );
//crUd
//router.put('/:id',auth, cartCtrl.updateProduct);
//cruD
//router.delete('/:id',auth, cartCtrl.deleteProduct);
//cRud
router.get('/carts', auth, cartCtrl.returnCarts); // will rerutn al products of unbmitted cart


module.exports = router;