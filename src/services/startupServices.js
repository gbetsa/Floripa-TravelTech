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
    }
}

module.exports = startupServices;