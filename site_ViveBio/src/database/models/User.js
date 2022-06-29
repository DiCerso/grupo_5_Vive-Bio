'use strict';

module.exports = (sequelize, dataTypes) => {

    const alias = "Users";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fristname: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName : 'rols'
                },
                key: 'id',
            }
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    const config = {
        tableName: "users",
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'rol_id'
        })
        User.belongsToMany(models.Product,{
            as : 'product',
            through : 'carts',
            foreignKey : 'user_id',
            otherKey : 'product_id',
            timestamps : false
        })

        User.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'user_id'
        })
        User.hasMany(models.Visit, {
            as: 'visit',
            foreignKey: 'user_id'
        })
        User.belongsToMany(models.Product,{
            as : 'product',
            through : 'favourites',
            foreignKey : 'user_id',
            otherKey : 'product_id',
            timestamps : false
        })
        
    }

    return User

}