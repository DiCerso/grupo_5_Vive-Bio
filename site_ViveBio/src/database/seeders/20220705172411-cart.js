'use strict';


const cart = [
  {
    user_id : 1,
    product_id : 1,
    cant : 1
  },
  {
    user_id : 1,
    product_id : 2,
    cant : 1
  }
]




module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts', cart, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Carts', null, {});

  }
}
