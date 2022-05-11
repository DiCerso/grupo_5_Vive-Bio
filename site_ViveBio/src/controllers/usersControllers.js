const path = require('path');

module.exports = {
    login: (req,res) => res.render(path.resolve('./src/views/users/login')),
    register: (req,res) => res.render(path.resolve('./src/views/users/register'))
}