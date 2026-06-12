const express = require('express');
const router = express.Router();
const superCostController = require('../controllers/SuperCostController');

router.post('/', superCostController.saveSuperCost);
router.get('/', superCostController.getAllSuperCosts);
router.get('/:ticket_id', superCostController.getSuperCost);
router.delete('/:ticket_id', superCostController.deleteSuperCost);
router.post('/reopen',superCostController.saveReopenCost);
router.get('/reopen/all',superCostController.getAllReopenCosts);



module.exports = router;
