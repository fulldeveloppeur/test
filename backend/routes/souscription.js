const express = require('express');
const souscriptionCtrl = require('../controllers/souscription');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', souscriptionCtrl.getAllSouscription);
router.post('/', multer, souscriptionCtrl.createSouscription);

module.exports = router;
