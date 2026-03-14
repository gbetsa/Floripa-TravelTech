const express = require('express');
const router = express.Router();

const startupRoutes = require('./startupRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

// Centralizador de rotas da aplicação
router.use('/api/startup', startupRoutes);

// Configuração da interface do Swagger para documentação da API
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
