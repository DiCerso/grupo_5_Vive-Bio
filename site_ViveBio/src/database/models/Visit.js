module.exports = (sequelize, datatypes) => {
    const alias = 'Visits'


    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        user_id : {
            type : datatypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: User,
                key: 'id',
            }
        },
        prduct_id : {
            type : datatypes.INTEGER.UNSIGNED,
            allowNull : false,
            references: {
                model: Product,
                key: 'id',
            }
        }
    }


    const config = {
        tableName : 'visits',
        timestamps : false
    }

    const Visit = sequelize.define(alias, cols, config)

    Visit.associate = function(models) {
        Visit.belongsTo(models.User, {
            as : 'user',
            foreignKey : 'user_id'
        })

        Visit.belongsTo(models.Product, {
            as : 'product',
            foreignKey : 'product_id'
        })
    }

    return Visit
}