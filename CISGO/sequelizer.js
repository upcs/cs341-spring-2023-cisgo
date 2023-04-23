const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('interactivemap', 'cisgouser@cisgodb', 'cisgo', {
    host: 'cisgodb.mariadb.database.azure.com',
    dialect: 'mariadb'
  })

module.exports = sequelize
