'use strict';

const usersdb = require('../../data/users.json')

const users = usersdb.map(user=>{
  return {
    ...user,
    createdAt: new Date()
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