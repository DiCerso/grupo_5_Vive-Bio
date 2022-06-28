module.exports = (sequelize, dataTypes) => {
    const alias = 'Order'


    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        status_id : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: Status,
                key: 'id',
            }
        },
        user_id : {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: User,
                key: 'id',
            }
        },
        total : {
            type: dataTypes.DECIMAL(6,2).UNSIGNED,
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