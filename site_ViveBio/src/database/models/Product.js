const Property = require("./Property");
const Category = require("./Category");

module.exports = (sequelize, dataTypes) => {

    const alias = "Product";

    const cols = {

        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },

        name : {
            type : dataTypes.STRING(100),
            allowNull : false,
        },

        volume : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },

        price : {
            type : dataTypes.DECIMAL(4,2).UNSIGNED,
            allowNull : false,
        },

        discount : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : true,
        },

        stock : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },

        ingredients : {
            type : dataTypes.TEXT.UNSIGNED,
            allowNull : false,
        },

        description : {
            type : dataTypes.TEXT,
            allowNull : false,
        },

        property_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            references: {
                        model: Property,
                        key: 'id',
                        }
            },

        category_id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            references: {
                model: Category,
                key: 'id',
                        }
            }
        }



    const config = {
        tableName : "products",
        timestamps : true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
    };


    const Product = sequelize.define(alias, cols, config);


    Product.associate = function(models){

        Product.belongsTo(models.Category,{
            as : 'categories',
            foreignKey : 'category_id'
            })
        Product.belongsTo(models.Property,{
            as : 'properties',
            foreignKey : 'property_id'
            })     

    }
    

    return Product
}
