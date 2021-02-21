var sequelize = require('sequelize');
var bcrypt  = require('bcrypt');

const sequelize = new sequelize('ourDatabase', 'root', 'root'{
  host: 'localhost',
  port: 8080,
  dialect:'mysql',
  pool: {
      max: 5,
      min: 0,
      aquire: 30000,
      idle: 1000
  },
  operatorsAliases: false
  
});

//set up user table

var user = sequelize.define('users'{
  id:{
    type: sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username:{
    type: sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password:{
    type: sequelize.STRING,
    allowNull: false
  }
});

user.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

});

user.prototype.validPassword = function(password){
  
}