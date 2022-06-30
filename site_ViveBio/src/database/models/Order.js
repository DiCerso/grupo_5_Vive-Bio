'use strict';
module.exports = (sequelize, DataTypes) => {
    const alias = 'Order'


    const cols = {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        status_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'status'
                },
                key: 'id',
            }
        },
        user_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'users'
                },
                key: 'id',
            }
        },
        total : {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull : false
        }
    }

    const config = {
        tableName : 'orders',
        timestamps : false
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = function(models){
        Order.belongsTo(models.Status,{
            as : 'status',
            foreignKey : 'status_id'
        })

        Order.belongsTo(models.User,{
            as : 'user',
            foreignKey : 'user_id'
        })

        Order.hasMany(models.Cart, {
            as : 'cart',
            foreignKey : 'order_id'
        })
    }

    return Order;
}