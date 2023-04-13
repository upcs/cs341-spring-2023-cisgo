const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelizer');

class Pin extends Model {}

Pin.init({
  // Model attributes are defined here
  TITLE: {
    type: DataTypes.TEXT,
  },
  NAME: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Pin' // We need to choose the model name
});

// the defined model is the class itself
console.log(Pin === sequelize.models.Pin); // true