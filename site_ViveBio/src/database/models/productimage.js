'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Productimage.init({
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    primary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Productimage',
  });
  return Productimage;
};