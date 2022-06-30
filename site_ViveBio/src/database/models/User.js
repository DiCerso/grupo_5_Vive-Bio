'use strict';

module.exports = (sequelize, DataTypes) => {

    const alias = "User";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fristname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rol_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName : 'rols'
                },
                key: 'id',
            }
        },
        image: {
            type: DataTypes.STRING(45),
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
        /* User.belongsToMany(models.Product,{
            as : 'product',
            through : 'favourites',
            foreignKey : 'user_id',
            otherKey : 'product_id',
            timestamps : false
        }) */
        
    }

    return User

}