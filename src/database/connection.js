const { Sequelize } = require("sequelize");
const databaseConfig = require("../config/database.config");

// Cria uma nova conexão com o banco de dados
const connection = new Sequelize(databaseConfig);

module.exports = connection;
