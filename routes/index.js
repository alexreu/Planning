var express = require ('express');
var router = express.Router();


var effectuer = require('../controllers/tacheAEffectuer');

router.get('/', effectuer.list);

router.post('/add', effectuer.add);



module.exports = router;