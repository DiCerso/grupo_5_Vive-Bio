'use strict';

const productsimagesdb = require('../../data/products_images.json')

const productImages = productsimagesdb.map(images => {
  return {
    ...images,
  }
})


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductsImages', productImages, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('ProductsImages', null, {});

  }
};
