'use strict';

const categories = [
  {
    name: 'BioCapilar',
    createdAt: new Date(),
  },
  {
    name: 'BioCorporal',
    createdAt: new Date(),
  },
  {
    name: 'BioSpa',
    createdAt: new Date(),
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
