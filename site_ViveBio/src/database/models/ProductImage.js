const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {

    const alias = "ProductImage";

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
        timestamps : false,
        createdAt: false,
        //updatedAt: 'updateTimestamp'
    };

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = function(models){
        ProductImage.belongsTo(models.Product,{
            as : 'product',
            foreignKey : 'product_id'
        })
}

    return ProductImage

}


