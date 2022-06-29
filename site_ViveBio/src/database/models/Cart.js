'use strict';
module.exports = (sequelize, dataTypes) => {
    const alias = 'Carts'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        user_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'users'
                },
                key: 'id',
            }
        },
        product_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },
        payment_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'payments'
                },
                key: 'id',
            }
        },
        order_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'orders'
                },
                key: 'id',
            }
        }
    }

    const config = {
        tableName : 'carts',
        timestamps : false
    }


    const Cart = sequelize.define(alias, cols, config)

    Cart.assiciate = function(models){
        Cart.belongsTo(models.Product,{
           as : 'product',
           foreignKey : 'product_id'
        })
        Cart.belongsTo(models.User,{
            as : 'user',
            foreignKey : 'user_id'
        })
        Cart.belongsTo(models.Payment,{
            as : 'payment',
            foreignKey : 'payment_id'
        })
        Cart.belongsTo(models.Order,{
            as : 'order',
            foreignKey : 'order_id'
        })

    }

    return Cart
}