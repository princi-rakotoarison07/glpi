const express = require('express');
const router = express.Router();

const settingsRoutes = require('./settings.routes');
const superCostRoutes = require('./superCost');

router.use('/settings', settingsRoutes);
router.use('/super-cost', superCostRoutes);

module.exports = router;