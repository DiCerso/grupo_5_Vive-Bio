'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_image.init({
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    primary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product_image',
  });
  return Product_image;
};