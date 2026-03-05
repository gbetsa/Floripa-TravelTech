const express = require('express');
const router = express.Router();

const startupRoutes = require('./startupRoutes');

router.use('/api/startup', startupRoutes);

module.exports = router;
