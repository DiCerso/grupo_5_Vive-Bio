const {check} = require('express-validator');
const users = require('../data/users.json');
const bcryptjs = require('bcryptjs');

module.exports = [
    
    check('user')
        .notEmpty().withMessage('Por favor, ingresa el nombre de usuario que elegiste al registrarte'),
    
    check('password')
        .notEmpty.withMessage('Por favor, ingresa tu contraseña').bail()
        .custom((value, {req}) => {
            const user = users.find(user => user.email === req.body.email);
            if(!user){
                return false
            }else{
                if(!bcryptjs.compareSync(value,user.password)){
                    return false
                }
            }
            return true
        }).withMessage('Datos inválidos'),
]