'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull : false

      },
      lastName: {
        type: Sequelize.STRING,
        allowNull : false

      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true

      },
      username: {
        type: Sequelize.STRING,
        allowNull : false

      },
      password: {
        type: Sequelize.STRING,
        allowNull : false

      },
      rol_id: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'rols'
          },
          key : 'id'
        }
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};