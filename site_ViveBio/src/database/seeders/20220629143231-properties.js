'use strict';



const properties = [
  {
    name : 'exfoliante'
  },
  {
    name : 'humectante'
  },
  {
    name : 'antiséptico'
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
