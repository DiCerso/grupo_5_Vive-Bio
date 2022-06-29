'use strict';

module.exports = (sequelize, dataTypes) => {

    const alias = "ProductsImages";

    const cols = {

        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },

        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },
        primary : {
            type : dataTypes.TINYINT(1)
        }

    }

    const config = {
        tableName: "productsimages",
        timestamps: false,
        createdAt: false,
        //updatedAt: 'updateTimestamp'
    };

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = function (models) {
        ProductImage.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        })
    }

    return ProductImage

}


