module.exports = (sequelize, dataTypes) => {

    const alias = "Property";

    const cols = {

        id : {
                type : dataTypes.INTEGER,
                autoIncrement : true,
                allowNull : false,
                primaryKey : true
            },

        name : {
                type : dataTypes.STRING(45),
                allowNull : false,
            },

                }



    const config = {
        tableName : "properties",
        timestamps : true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
    };


    const Property = sequelize.define(alias, cols, config);


    Property.associate = function(models){

        Property.hasMany(models.Products,{
            as : 'products_property',
            foreignKey : 'category_id'
            })

    }
    

    return Property;
}
