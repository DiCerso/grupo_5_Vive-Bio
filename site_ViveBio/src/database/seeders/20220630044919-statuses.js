'use strict';

const statuses = [
  {
    name : 'En proceso',
    createdAt : new Date()
  },
  {
    name : 'Finalizado',
    createdAt : new Date()
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Statuses', statuses, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Statuses', null, {});

  }
};
