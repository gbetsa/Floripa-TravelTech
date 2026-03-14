const startupServices = require('../services/startupServices');

const startupControllers = {
    // Controller para criar uma nova startup
    async create(req, res) {
        try {
            const data = req.body;

            // Delega a criação para a camada de serviço
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

    // Controller para listar todas as startups com filtros opcionais
    async findAll(req, res) {
        try {
            const filters = req.query; // Captura filtros da query string

            // Busca startups aplicando os filtros recebidos
            const startups = await startupServices.findAll(filters);
            return res.status(200).json(startups);
        } catch (error) {
            if (error.message === 'ERRO_FILTRO_INVALIDO') {
                return res.status(400).json({
                    message: 'Filtro inválido'
                });
            }
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

    // Controller para buscar uma startup pelo ID
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

    // Controller para atualizar uma startup pelo ID
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
    },

    // Controller para remover uma startup pelo ID
    async remove(req, res) {
        try {
            const startup = await startupServices.remove(req.params.id);
            return res.status(200).json({
                message: 'Startup removida com sucesso'
            });
        } catch (error) {
            if (error.message === 'ERRO_REMOVER_STARTUP') {
                return res.status(404).json({
                    message: 'Não foi possível encontrar a startup'
                });
            }
            return res.status(500).json({
                message: 'Erro interno ao remover startup'
            });
        }
    },

    // Controller para gerar estatísticas das startups
    async stats(req, res) {
        try {
            const stats = await startupServices.stats();
            return res.status(200).json(stats);
        } catch (error) {
            if (error.message === 'ERRO_GERAR_ESTATISTICAS') {
                return res.status(404).json({
                    message: 'Não foi possível gerar estatísticas'
                });
            }
            return res.status(500).json({
                message: 'Erro interno ao gerar estatísticas'
            });
        }
    },

    // Controller para buscar startups por nome
    async search(req, res) {
        try {

            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({
                    error: 'PARAMETRO_NOME_OBRIGATORIO'
                });
            }

            const startups = await startupServices.searchByName(nome);

            return res.json(startups);

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = startupControllers;