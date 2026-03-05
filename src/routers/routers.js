const express = require('express');
const router = express.Router();

const startupRoutes = require('./startupRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

router.use('/api/startup', startupRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
