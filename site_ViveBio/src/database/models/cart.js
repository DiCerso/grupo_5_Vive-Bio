'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
  
    /* static associate(models) {
      Cart.hasMany(models.User,{
        as : 'users',
        foreignKey : 'user_id'
      })
      Cart.hasMany(models.Product,{
        as : 'products',
        foreignKey : 'product_id'
      })
      Cart.belongsTo(models.Payment,{
        as : 'payments',
        foreignKey : 'payment_id'
      })
      Cart.belongsTo(models.Order,{
        as : 'orders',
        foreignKey : 'order_id'
      })
    } */
  }
  Cart.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};