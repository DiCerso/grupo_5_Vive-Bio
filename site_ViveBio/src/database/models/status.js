'use strict';

module.exports = (sequelize, DataTypes) => {
    
    const alias = 'Status'

    const cols = {
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(45)
        }
    }

    const config = {
        tableName : 'status',
        timestamps : false
    }

    const Status = sequelize.define(alias,cols,config)

    Status.associate = function(models){
        Status.hasMany(models.Order,{
            as : 'Order',
            foreignKey : 'status_id'
        })
    }

    return Status
}