const express = require('express');
const router = express.Router();

const itemsRoutes = require('./items.routes');

router.use('/items', itemsRoutes);

// Ajoute tes futures routes ici :
// router.use('/tickets', ticketsRoutes);

module.exports = router;