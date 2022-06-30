'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'statuses'
          },
          key : 'id'
        }
      },
      user_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'users'
          },
          key : 'id'
        }
      },
      total: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleteAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};