const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const ownerCtrl = require('../controllers/shopOwner')


router.get('/orders', auth, ownerCtrl.returnSubmittedOrders); 
router.post('/product',auth, ownerCtrl.createProduct );
router.put('/product/:id',auth, ownerCtrl.updateProduct);
router.delete('/product/:id',auth, ownerCtrl.deleteProduct);


module.exports = router;