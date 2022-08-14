'use strict';


const rols = [
  {
    name : 'admin'
  },
  {
    name : 'user'
  },
  {
    name : 'moderator'
  }
]




module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rols', rols, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Rols', null, {});

  }
}
