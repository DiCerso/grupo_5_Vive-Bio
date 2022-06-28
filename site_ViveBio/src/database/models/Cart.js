module.exports = (sequelize, dataTypes) => {
    const alias = 'cart'

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
                model: User,
                key: 'id',
            }
        },
        product_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: Product,
                key: 'id',
            }
        },
        payment_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: Payment,
                key: 'id',
            }
        },
        order_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: Order,
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