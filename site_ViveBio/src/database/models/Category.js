
'use strict';
module.exports = (sequelize, DataTypes) => {

    const alias = "Category";

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

    }



    const config = {
        tableName: "categories",
        timestamps: false,
        createdAt: false,
        /* updatedAt: 'updateTimestamp' */
    };


    const Category = sequelize.define(alias, cols, config);


    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id'
        })
    }


    return Category;

}