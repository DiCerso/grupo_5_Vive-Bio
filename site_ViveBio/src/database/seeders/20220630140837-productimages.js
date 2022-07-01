'use strict';

const productimagesdb = require('../../data/products_Images.json')

const productimages = productimagesdb.map(productimage=>{
  return {
    ...productimage,
    createdAt: new Date()
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Productimages', productimages, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Productimages', null, {});

  }
};