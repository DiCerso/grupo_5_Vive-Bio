'use strict';

module.exports = (sequelize, DataTypes) => {

    const alias = "ProductImage";

    const cols = {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName : 'products'
                },
                key: 'id',
            }
        },
        primary : {
            type : DataTypes.TINYINT(1)
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




