'use strict';
module.exports = (sequelize, DataTypes) => {
    const alias = 'Order'
    
    const cols = {
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
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
        payment_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'payments'
                },
                key: 'id',
            }
        },
        total : {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull : false
        },
        products_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },
        number : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        amount : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false
        }
    }

    const config = {
        tableName : 'orders',
        timestamps : false,
        createdAt: false,
        updatedAt: false
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


        Order.belongsTo(models.Payment,{
            as : 'payment',
            foreignKey : 'payment_id'
        })

        Order.belongsTo(models.Product,{
            as : 'products',
            foreignKey : 'products_id'
        })

        
    }

    return Order;
}