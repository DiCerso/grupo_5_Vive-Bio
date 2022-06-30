'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      product_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'products'
          },
          key : 'id'
        }
      },
      payment_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'payments'
          },
          key : 'id'
        }
      },
      order_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'orders'
          },
          key : 'id'
        }
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
    await queryInterface.dropTable('Carts');
  }
};