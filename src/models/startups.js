const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

// Definição do modelo de startups
const ModelStartups = connection.define('Startup', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    fundador: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    municipio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Florianópolis'
    },

    segmento_turismo: {
        type: DataTypes.ENUM(
            'Hospedagem',
            'Transporte',
            'Experiencias',
            'Marketplace',
            'Tecnologia_Hotelaria',
            'Tecnologia_Agencias',
            'Eventos',
            'Turismo_Sustentavel',
            'Outro'
        ),
        allowNull: false
    },

    modelo_negocio: {
        type: DataTypes.STRING,
        allowNull: false
    },

    estagio: {
        type: DataTypes.ENUM('Ideação', 'MVP', 'Tração', 'Escala'),
        allowNull: false
    },

    ano_fundacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo'
    }
}, {
    tableName: 'Startups',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

module.exports = ModelStartups;