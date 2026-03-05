const ModelStartups = require('../models/startups');

const { Sequelize } = require('sequelize');

const startupServices = {
    async create(data) {
        try {
            const startup = await ModelStartups.create(data);
            return startup;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('CNPJ_DUPLICADO');
            }

            throw new Error('ERRO_CRIAR_STARTUP');
        }
    },

    async findAll(filters = {}) {
        try {
            const where = {};

            if (filters.estagio) {
                where.estagio = filters.estagio;
            }

            if (filters.status) {
                where.status = filters.status;
            }

            if (filters.ano_fundacao) {
                where.ano_fundacao = filters.ano_fundacao;
            }

            if (filters.modelo_negocio) {
                where.modelo_negocio = filters.modelo_negocio;
            }

            const page = parseInt(filters.page) || 1;
            const limit = parseInt(filters.limit) || 10;
            const offset = (page - 1) * limit;

            const orderField = filters.orderBy || 'createdAt';
            const orderDirection = filters.orderDirection || 'DESC';

            const startups = await ModelStartups.findAll({
                where,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [[orderField, orderDirection]],
                limit,
                offset
            });

            return startups;
        } catch (error) {
            throw new Error('ERRO_LISTAR_STARTUPS');
        }
    },

    async findOne(id) {
        try {
            const startup = await ModelStartups.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            return startup;
        } catch (error) {
            throw new Error('ERRO_LISTAR_STARTUP');
        }
    },

    async update(id, data) {
        try {
            const startup = await ModelStartups.update(data, {
                where: {
                    id
                }
            });
            return startup;
        } catch (error) {
            throw new Error('ERRO_ATUALIZAR_STARTUP');
        }
    },

    async remove(id) {
        try {
            const startup = await ModelStartups.destroy({
                where: {
                    id
                }
            });
            return startup;
        } catch (error) {
            throw new Error('ERRO_REMOVER_STARTUP');
        }
    },

    async stats() {
        try {

            const total = await ModelStartups.count();

            const porEstagio = await ModelStartups.findAll({
                attributes: [
                    'estagio',
                    [Sequelize.fn('COUNT', Sequelize.col('estagio')), 'total']
                ],
                group: ['estagio']
            });

            const porStatus = await ModelStartups.findAll({
                attributes: [
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']
                ],
                group: ['status']
            });

            return {
                total_startups: total,
                por_estagio: porEstagio,
                por_status: porStatus
            };

        } catch (error) {
            throw new Error('ERRO_GERAR_ESTATISTICAS');
        }
    }
}

module.exports = startupServices;