'use strict';

const productsdb = require('../../data/products.json')

const products = productsdb.map(product => {
  return {
    ...product,
  }
})


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Products', null, {});

  }
};
