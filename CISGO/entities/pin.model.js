const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelizer');

class Pin extends Model {}

Pin.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.TEXT
  },
  name: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  country: {
    type: DataTypes.TEXT
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Pin' // We need to choose the model name
});

sequelize.sync().then(() => {
  /*Pin.create({
    title: "example",
    name: "Carter",
    country: "USA"
  })*/
  console.log('Pin table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// the defined model is the class itself
console.log(Pin === sequelize.models.Pin); // true
module.exports = {
  Pin: Pin
}