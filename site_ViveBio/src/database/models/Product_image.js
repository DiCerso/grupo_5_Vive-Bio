const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {

    const alias = "Product_image";

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

        product_id : {
                type : dataTypes.INTEGER,
                allowNull : false,
                references: {
                            model: Product,
                            key: 'id',
                            }
                },        

                }



    const config = {
        tableName : "products_images",
        timestamps : true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
    };

    
}


const Product_image = sequelize.define(alias, cols, config);