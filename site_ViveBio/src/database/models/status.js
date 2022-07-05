'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {

   /*  static associate(models) {
      // define association here
      Status.hasMany(models.Order,{
        as : 'oders',
        foreignKey : 'status_id'
      })
    } */
  }
  Status.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};