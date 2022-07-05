'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as : 'rols',
        foreignKey : 'rol_id'
      })
      /* User.hasMany(models.Order,{
        as : 'orders',
        foreignKey : 'user_id'
      })
      User.hasMany(models.Favourite,{
        as : 'favourites',
        foreignKey : 'user_id'
      })
      User.belongsTo(models.Order,{
        as : 'orders',
        foreignKey : 'user_id'
      })
      User.hasMany(models.Visit,{
        as : 'visits',
        foreignKey : 'user_id'
      }) */
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};