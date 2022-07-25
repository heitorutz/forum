const Sequelize = require('sequelize');

const connection = new Sequelize('forum', 'root', '231104hp', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;