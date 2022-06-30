'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'categories'
          },
          key : 'id'
        }
      },
      volume: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      property_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'properties'
          },
          key : 'id'
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      visits: {
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};