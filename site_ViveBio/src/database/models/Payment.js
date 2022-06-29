module.exports = (sequelize, dataTypes) => {
    const alias = 'Payment';

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
    }


    const config = {
        tableName: 'payments',
        timestamp: false
    }


    const Payment = sequelize.define(alias, cols, config)

    Payment.assiciate = function (models) {

        Payment.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'payment_id'
        })
    }

    return Payment
}