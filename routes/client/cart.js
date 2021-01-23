const express = require('express');
const router = express.Router();

const cartCtrl = require('../../controllers/cart');
const auth = require('../../middleware/auth');



router.post('/submit',auth, cartCtrl.submitOrder );
router.put('/:id',auth, cartCtrl.putProductInCart);
router.get('/', auth, cartCtrl.returnUsersCart); 


module.exports = router;