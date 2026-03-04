const startupServices = require('../services/startupServices');

const startupControllers = {
    async create(req, res) {
        try {
            const data = req.body;

            const startup = await startupServices.create(data);

            return res.status(201).json({
                message: 'Startup cadastrada com sucesso',
                data: startup
            });

        } catch (error) {
            if (error.message === 'CNPJ_DUPLICADO') {
                return res.status(409).json({
                    message: 'Já existe uma startup cadastrada com esse CNPJ'
                });
            }

            return res.status(500).json({
                message: 'Erro interno ao cadastrar startup'
            });
        }
    }
}

module.exports = startupControllers;