const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('interactivemap', 'cisgouser', 'cisgo', {
    host: 'cisgodb.mariadb.database.azure.com',
    dialect: 'mariadb'
  })

module.exports = sequelize
