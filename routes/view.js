const express = require('express');
const router = express.Router();

const viewCtrl = require('../controllers/view');
const auth = require('../middleware/auth');


router.post('/',auth, viewCtrl.viewInventory );
router.post('/:category',auth, viewCtrl.viewCategory);


module.exports = router;