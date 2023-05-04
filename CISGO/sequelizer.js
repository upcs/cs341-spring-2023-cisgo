
const { Sequelize } = require('sequelize')

//initializes sequelize connection to database
const sequelize = new Sequelize('interactivemap', 'cisgouser@cisgodb', 'cisgo', {
  host: 'cisgodb.mariadb.database.azure.com',
  dialect: 'mariadb'
})



module.exports = sequelize
