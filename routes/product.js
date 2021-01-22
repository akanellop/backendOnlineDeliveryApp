const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product')

//----------------------------------
//API routes handling
//----------------------------------

// Crud
router.post('/', productCtrl.createProduct );
//crUd
router.put('/:id',productCtrl.updateProduct);
//cruD
router.delete('/:id', productCtrl.deleteProduct);
//cRud
router.get('/', productCtrl.returnProducts);


module.exports = router;