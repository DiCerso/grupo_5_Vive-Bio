module.exports = (sequelize, dataTypes) => {

    const alias = "Properties";

    const cols = {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },

    }



    const config = {
        tableName: "properties",
        timestamps: false,
        createdAt: false,
        //updatedAt: 'updateTimestamp'
    };


    const Property = sequelize.define(alias, cols, config);


    Property.associate = function (models) {

        Property.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'property_id'
        })

    }


    return Property;
}
