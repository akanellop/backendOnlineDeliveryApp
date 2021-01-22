const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');
const auth = require('../middleware/auth');


//----------------------------------
//API routes handling
//----------------------------------

// Crud
router.post('/',auth, productCtrl.createProduct );
//crUd
router.put('/:id',auth, productCtrl.updateProduct);
//cruD
router.delete('/:id',auth, productCtrl.deleteProduct);
//cRud
router.get('/', auth, productCtrl.returnProducts);


module.exports = router;