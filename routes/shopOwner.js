const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const ownerCtrl = require('../controllers/shopOwner')


router.get('/orders', auth, ownerCtrl.returnSubmittedOrders); 

router.post('/product',auth, ownerCtrl.createProduct );
router.put('/product/:id',auth, ownerCtrl.updateProduct);
router.delete('/product/:id',auth, ownerCtrl.deleteProduct);



/////////////// For Testing Purposes 
router.post('/erase', auth, ownerCtrl.deleteEverything); //Erases everything from database
router.get('/users', auth, ownerCtrl.returnUsers); 


module.exports = router;