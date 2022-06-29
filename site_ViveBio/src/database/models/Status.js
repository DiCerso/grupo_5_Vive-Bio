'use strict';

module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Status'

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : dataTypes.STRING(45)
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