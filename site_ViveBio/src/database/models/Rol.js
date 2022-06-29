'use strict';
module.exports = (sequelize, dataTypes) => {
    
    const alias = "Rols"


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