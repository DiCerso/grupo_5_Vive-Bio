'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
  
    /* static associate(models) {
      // define association here
      Visit.hasMany(models.User,{
        as : 'users',
        foreignKey : 'user_id'
      })
      Visit.hasMany(models.Product,{
        as : 'products',
        foreignKey : 'product_id'
      })
    } */
  }
  Visit.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Visit',
  });
  return Visit;
};