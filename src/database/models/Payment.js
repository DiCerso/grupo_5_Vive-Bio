'use strict';
module.exports = (sequelize, DataTypes) => {
    const alias = 'Payment';

    const cols = {
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
    }


    const config = {
        tableName: 'payments',
        timestamp: false,
        createdAt: false,
        updatedAt : false
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