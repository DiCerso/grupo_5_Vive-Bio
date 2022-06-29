'use strict';

module.exports = (sequelize, dataTypes) => {

    const alias = "Favourites";

    const cols = {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },

        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName : 'users'
                },
                key: 'id',
            }
        }

    }


    const config = {
        tableName: "favourites",
        timestamps: false,
        createdAt: false,
        //updatedAt: 'updateTimestamp'
    };


    const Favourite = sequelize.define(alias, cols, config);


    Favourite.associate = function (models) {

        Favourite.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_id',
        })

        Favourite.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id',
        })

    }


    return Favourite;

}
