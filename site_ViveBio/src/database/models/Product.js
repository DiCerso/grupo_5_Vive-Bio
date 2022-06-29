module.exports = (sequelize, dataTypes) => {

    const alias = "Product";

    const cols = {

        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },

        volume: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        price: {
            type: dataTypes.DECIMAL(4, 2).UNSIGNED,
            allowNull: false,
        },

        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },

        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },

        ingredients: {
            type: dataTypes.TEXT,
            allowNull: false,
        },

        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },

        property_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Property,
                key: 'id',
            }
        },

        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'id',
            }
        }
    }



    const config = {
        tableName: "products",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    };


    const Product = sequelize.define(alias, cols, config);


    Product.associate = function (models) {

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })

        Product.belongsTo(models.Property, {
            as: 'property',
            foreignKey: 'property_id'
        })

        Product.belongsToMany(models.User, {
            as: 'users',
            through: 'favourites',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })

        Product.hasMany(models.ProductImage, {
            as: 'productImages',
            foreignKey: 'product_id'
        })


        Product.belongsToMany(models.User,{
            as : 'user',
            through : 'carts',
            foreignKey : 'product_id',
            otherKey : 'user_id',
            timestamps : false
        })

        Product.hasMany(models.Visit,{
            as : 'visit',
            foreignKey : 'product_id'
        })
    }

    return Product
}
