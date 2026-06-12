const express = require('express');
const router = express.Router();
const superCostController = require('../controllers/SuperCostController');

router.post('/', superCostController.saveSuperCost);
router.get('/', superCostController.getAllSuperCosts);
router.get('/:ticket_id', superCostController.getSuperCost);

module.exports = router;
