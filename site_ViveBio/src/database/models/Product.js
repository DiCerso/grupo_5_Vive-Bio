'use strict';
module.exports = (sequelize, DataTypes) => {

    const alias = "Product";

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        volume: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        discount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        property_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName : 'properties'
                },
                key: 'id',
            }
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    tableName : 'categories'
                },
                key: 'id',
            }
        },
        ingredients : {
            type: DataTypes.TEXT,
            allowNull : false
        },

    }



    const config = {
        tableName: "products",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    };


    const Product = sequelize.define(alias, cols, config);


    Product.associate = function (models) {

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })

         Product.belongsTo(models.Property, {
            as: 'property',
            foreignKey: 'property_id'
        })

        Product.belongsToMany(models.User, {
            as: 'usersfavourite',
            through: 'favourites',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })

        Product.hasMany(models.ProductImage, {
            as: 'productImages',
            foreignKey: 'product_id'
        })


        Product.belongsToMany(models.User,{
            as : 'user',
            through : 'carts',
            foreignKey : 'product_id',
            otherKey : 'user_id',
            timestamps : false
        })

        Product.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'products_id'
        })

    }

    return Product
}