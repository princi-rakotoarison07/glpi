const express = require('express');
const router = express.Router();

const settingsRoutes = require('./settings.routes');

router.use('/settings', settingsRoutes);

module.exports = router;