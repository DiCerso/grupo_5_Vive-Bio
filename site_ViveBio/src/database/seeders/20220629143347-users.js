'use strict';

let usersdb = require('../../data/users.json');


let users = usersdb.map(user => {
  return {
    ...user
  }
})



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
