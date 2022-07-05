'use strict';
module.exports = (sequelize, DataTypes) => {
    
    const alias = "Rol"


    const cols = {
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(45),
            allowNull : false,
        }
    }

    const config = {
        tableName : "rols",
        timestamps : false
    }



    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = function(models){
        Rol.hasMany(models.User, {
            as : 'users',
            foreignKey : 'rol_id'
        })
    }

    return Rol;
}