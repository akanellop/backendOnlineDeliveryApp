const express = require('express');
const router = express.Router();

const viewCtrl = require('../controllers/view');
const auth = require('../middleware/auth');


router.get('/',auth, viewCtrl.viewInventory );
router.get('/:category',auth, viewCtrl.viewCategory);


module.exports = router;