'use strict';
module.exports = (sequelize, DataTypes) => {
    const alias = 'Cart'

    const cols = {
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        user_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'users'
                },
                key: 'id',
            }
        },
        product_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },
        cant : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            default : 1
        }
    }

    const config = {
        tableName : 'carts',
        timestamps : false, 
        createdAt: false,
        updatedAt : false    
    }


    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function(models){
        Cart.belongsTo(models.Product,{
           as : 'product',
           foreignKey : 'product_id'
        })
        Cart.belongsTo(models.User,{
            as : 'user',
            foreignKey : 'user_id'
        })
    }

    return Cart
}