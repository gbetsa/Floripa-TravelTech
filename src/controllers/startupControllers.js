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
    },

    async findAll(req, res) {
        try {
            const startups = await startupServices.findAll();
            return res.status(200).json(startups);
        } catch (error) {
            if (error.message === 'ERRO_LISTAR_STARTUPS') {
                return res.status(404).json({
                    message: 'Nenhuma startup cadastrada'
                });
            }
            return res.status(500).json({
                message: 'Erro interno ao listar startups'
            });
        }
    },

    async findOne(req, res) {
        try {
            const startup = await startupServices.findOne(req.params.id);
            return res.status(200).json(startup);
        } catch (error) {
            if (error.message === 'ERRO_LISTAR_STARTUP') {
                return res.status(404).json({
                    message: 'Não foi possível encontrar a startup'
                });
            }
            return res.status(500).json({
                message: 'Erro interno ao listar startup'
            });
        }
    },

    async update(req, res) {
        try {
            const [updatedRows] = await startupServices.update(req.params.id, req.body);

            if (updatedRows === 0) {
                return res.status(404).json({
                    message: 'Não foi possível encontrar a startup'
                });
            }

            return res.status(200).json({
                message: 'Startup atualizada com sucesso',
                // Dados atualizados
                data: req.body
            });
        } catch (error) {
            if (error.message === 'ERRO_ATUALIZAR_STARTUP') {
                return res.status(404).json({
                    message: 'Não foi possível encontrar a startup'
                });
            }
            return res.status(500).json({
                message: 'Erro interno ao atualizar startup'
            });
        }
    }
}

module.exports = startupControllers;