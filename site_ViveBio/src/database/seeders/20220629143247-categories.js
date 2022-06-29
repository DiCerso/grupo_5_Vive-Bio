'use strict';

let categoriesdb = require('../../data/categories.json')

let categories = categoriesdb.map(category => {
  return {
    ...category
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categories, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
