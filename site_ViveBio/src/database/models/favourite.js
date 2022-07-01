'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
  
   /*  static associate(models) {
      // define association here
      Favourite.hasMany(models.User,{
        as : 'users',
        foreignKey : 'user_id'
      });
      Favourite.hasMany(models.Product,{
        as : 'products',
        foreignKey : 'product_id'
      });
    } */
  }
  Favourite.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};