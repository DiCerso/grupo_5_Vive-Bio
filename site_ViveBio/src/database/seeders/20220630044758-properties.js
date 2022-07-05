'use strict';

const properties = [
  {
    name : 'exfoliante',
    createdAt : new Date()
  },
  {
    name : 'humectante',
    createdAt : new Date()
  },
  {
    name : 'antiséptico',
    createdAt : new Date()
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Properties', properties, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Properties', null, {});

  }
};