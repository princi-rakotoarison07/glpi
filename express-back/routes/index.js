const express = require('express');
const router = express.Router();

const settings = require('../controllers/settings.controller');
const costs = require('../controllers/costs.controller');
const independent = require('../controllers/independent-costs.controller');

// 1. Settings Routes
router.route('/settings')
  .get(settings.getSettings)
  .put(settings.updateSettings);

// 2. Costs Routes
router.route('/costs')
  .get(costs.getCosts)
  .post(costs.createCost);

router.route('/costs/ticket/:id')
  .get(costs.getCostByTicketId)
  .delete(costs.deleteCostByTicketId);

router.put('/costs/ticket/:id/reouverture', costs.updateCostReouverture);

// 3. Independent Costs Routes
router.route('/independent-costs')
  .get(independent.getIndependentCosts);

router.post('/independent-costs/close', independent.createCloseCosts);
router.post('/independent-costs/reopen', independent.createReopenCost);
router.delete('/independent-costs/ticket/:id', independent.deleteLatestCostGroup);

module.exports = router;