'use strict';

const payments = [
  {
    name : 'Efectivo',
    createdAt : new Date()
  },
  {
    name : 'Tarjeta',
    createdAt : new Date()
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Payments', payments, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Payments', null, {});

  }
};
