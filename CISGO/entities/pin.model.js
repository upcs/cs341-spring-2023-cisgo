const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelizer');
//sets up database and creates class based off columns
class Pin extends Model {}

Pin.init({
    // Model attributes are defined here
    name: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    country: {
        type: DataTypes.TEXT
    },
    start_date: {
        type: DataTypes.TEXT
    },
    end_date: {
        type: DataTypes.TEXT
    },
    finished: {
        type: DataTypes.TEXT
    },
    S_U_D: {
        type: DataTypes.TEXT
    },
    eng_type: {
        type: DataTypes.TEXT
    },
    time: {
        type: DataTypes.TEXT
    },
    desc: {
        type: DataTypes.TEXT
    },
    link: {
        type: DataTypes.TEXT
    },
    stu_inv: {
        type: DataTypes.TEXT
    },
    stu_role: {
        type: DataTypes.TEXT
    },
    emailme: {
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
