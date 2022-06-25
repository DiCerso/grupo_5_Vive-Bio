const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {

    const alias = "Favourite";

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

        user_id : {
                type : dataTypes.INTEGER,
                allowNull : false,
                references: {
                    model: Users,
                    key: 'id',
                            }
                    }

                }


    const config = {
        tableName : "favourites",
        timestamps : true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
    };


    const Favourite = sequelize.define(alias, cols, config);


    Favourite.associate = function(models){

        Favourite.belongsToMany(models.Products,{
            as : '',
            foreignKey : 'category_id'
            })
     
        }


    return Favourite;
    
}
