'use strict';
module.exports = (sequelize, DataTypes) => {
    const alias = 'Visit'

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
        prduct_id : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        }
    }


    const config = {
        tableName : 'visits',
        timestamps : false
    }

    const Visit = sequelize.define(alias, cols, config)

     Visit.associate = function(models) {
        Visit.belongsTo(models.User, {
            as : 'user',
            foreignKey : 'user_id'
        })

        Visit.belongsTo(models.Product, {
            as : 'product',
            foreignKey : 'product_id'
        })
    } 

    return Visit
}