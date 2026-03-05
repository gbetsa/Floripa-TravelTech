const swaggerJsdoc = require('swagger-jsdoc');
APP_PORT = process.env.APP_PORT;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Floripa TravelTech API',
            version: '1.0.0',
            description: `
                API REST desenvolvida para gerenciamento de startups do ecossistema de turismo (TravelTech) de Florianópolis.

                A API permite:
                    • Cadastro de startups
                    • Consulta e listagem de startups cadastradas
                    • Atualização e remoção de registros
                    • Filtros por estágio, status, ano de fundação e modelo de negócio
                    • Busca por nome de startup
                    • Estatísticas do ecossistema

                O objetivo é centralizar e facilitar o acesso às informações de startups do setor de turismo, apoiando iniciativas de inovação, mapeamento do ecossistema e análise de dados.
            `
        },
        components: {
            schemas: {
                Startup: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID da startup',
                            example: 'bd7d56e1-f633-49cb-a083-10c426b6050b',
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome da startup',
                            example: 'Nova Startup',
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição da startup',
                            example: 'Uma startup inovadora.',
                        },
                        cnpj: {
                            type: 'string',
                            description: 'CNPJ da startup',
                            example: '00000000000100',
                        },
                        fundador: {
                            type: 'string',
                            description: 'Fundador da startup',
                            example: 'Empresário X',
                        },
                        email: {
                            type: 'string',
                            description: 'Email da startup',
                            example: 'contato@nova.com',
                        },
                        municipio: {
                            type: 'string',
                            description: 'Municipio da startup',
                            example: 'Florianópolis',
                        },
                        segmento_turismo: {
                            type: 'string',
                            enum: ['Hospedagem', 'Transporte', 'Alimentação', 'Atrativos', 'Eventos', 'Outros'],
                            description: 'Segmento da startup',
                            example: 'Hospedagem',
                        },
                        modelo_negocio: {
                            type: 'string',
                            description: 'Modelo de negócio da startup',
                            example: 'B2B',
                        },
                        estagio: {
                            type: 'string',
                            enum: ['Ideação', 'Validação', 'Operação', 'Tração', 'Scale-up'],
                            description: 'Estágio da startup',
                            example: 'Ideação',
                        },
                        ano_fundacao: {
                            type: 'integer',
                            description: 'Ano de fundação da startup',
                            example: 2024,
                        },
                        status: {
                            type: 'string',
                            description: 'Status da startup',
                            example: 'Ativa',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação da startup',
                            example: '2024-03-05T04:24:06Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de atualização da startup',
                            example: '2024-03-05T04:24:06Z',
                        },
                    },
                },
            },
        },
        servers: [
            {
                url: `http://localhost:${APP_PORT}`,
                description: 'Local',
            },
        ],
    },
    apis: ['./src/routers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;