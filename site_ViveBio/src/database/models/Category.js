module.exports = (sequelize, dataTypes) => {

    const alias = "Category";

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
        tableName: "categories",
        timestamps: true,
        createdAt: false,
        updatedAt: 'updateTimestamp'
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