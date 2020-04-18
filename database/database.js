const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', 'Alfa045879', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;