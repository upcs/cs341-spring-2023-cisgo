const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('cisgo', 'cisgouser', 'cisgo', {
    host: '10.13.6.44',
    dialect: 'mariadb'
  })

module.exports = sequelize