'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

   /*  static associate(models) {
      // define association here
      Payment.hasMany(models.Cart,{
        as : 'carts',
        foreignKey : 'payment_id'
      })
    } */
  }
  Payment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};