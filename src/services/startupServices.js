const ModelStartups = require('../models/startups');

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

    async findAll() {
        try {
            const startups = await ModelStartups.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
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
    }
}

module.exports = startupServices;