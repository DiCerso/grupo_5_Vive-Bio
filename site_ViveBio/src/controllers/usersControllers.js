const path = require('path');
const fs = require('fs');

const users = require('../data/users.json');

module.exports = {
    login: (req,res) => res.render(path.resolve('./src/views/users/login')),
    register: (req,res) => res.render(path.resolve('./src/views/users/register'))
}