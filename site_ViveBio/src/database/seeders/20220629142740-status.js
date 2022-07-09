'use strict';


const status = [
  {
    name : 'en proceso'
  },
  {
    name : 'finalizado'
  }
]



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Status', status, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Status', null, {});

  }
};
