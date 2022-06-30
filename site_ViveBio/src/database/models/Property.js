'use strict';
module.exports = (sequelize, DataTypes) => {

    const alias = "Property";

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
        tableName: "properties",
        timestamps: false,
        createdAt: false,
    };


    const Property = sequelize.define(alias, cols, config);


    Property.associate = function (models) {

        Property.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'property_id'
        })

    }


    return Property;
}
