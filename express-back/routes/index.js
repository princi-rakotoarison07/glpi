const express = require('express');
const router = express.Router();

const settingsRoutes = require('./settings.routes');
const ticketCostRoutes = require('./ticketCost.routes');

router.use('/settings', settingsRoutes);
router.use('/ticket-cost', ticketCostRoutes);

module.exports = router;