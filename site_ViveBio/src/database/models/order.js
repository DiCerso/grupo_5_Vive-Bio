'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

/*     static associate(models) {
      // define association here
      Order.belongsTo(models.Status,{
        as : 'statuses',
        foreignKey : 'status_id'
      })
      Order.belongsTo(models.User,{
        as : 'users',
        foreignKey : 'user_id'
      })
    } */
  }
  Order.init({
    status_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};