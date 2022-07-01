'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        as : 'categories',
        foreignKey : 'category_id'
      });

      Product.hasMany(models.Productimage,{
        as : 'productimages',
        foreignKey : 'product_id',
        onDelete: 'cascade'
      })
      Product.belongsTo(models.Property,{
        as : 'properties',
        foreignKey : 'property_id'
      })
      /* Product.hasMany(models.Cart,{
        as : 'carts',
        foreignKey : 'product_id'
      })
      Product.hasMany(models.Favourite,{
        as : 'favourites',
        foreignKey : 'product_id'
      })
      Product.hasMany(models.Visit,{
        as : 'visits',
        foreignKey : 'product_id'
      }) */
      /* Product. */
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(500),
    category_id: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    property_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    visits: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};