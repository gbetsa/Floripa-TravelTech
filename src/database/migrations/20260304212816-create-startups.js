'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Startups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      fundador: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Florianópolis'
      },

      segmento_turismo: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: false
      },

      estagio: {
        type: Sequelize.ENUM('Ideação', 'MVP', 'Tração', 'Escala'),
        allowNull: false
      },

      ano_fundacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Startups');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Startups_estagio";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Startups_status";');
  }
};