'use strict';


let payments = [
  {
    name : 'targeta'
  },
  {
    name : 'efectivo'
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
