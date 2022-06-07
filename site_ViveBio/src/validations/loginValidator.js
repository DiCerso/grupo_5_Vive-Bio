const {check} = require('express-validator');
const users = require('../data/users.json');
const bcryptjs = require('bcryptjs');

module.exports = [
    
    check('user')
        .notEmpty().withMessage('Por favor, ingresa tu usuario.'),
    
    check('password')
        .notEmpty().withMessage('Por favor, ingresa tu contraseña.').bail()
        .custom((value, {req}) => {
            const usuarios = users.find(usuario => usuario.user === req.body.user);
            if(!usuarios){
                return false
            }else{
                if(!bcryptjs.compareSync(value,usuarios.password)){
                    return false
                }
            }
            return true
        }).withMessage('Datos inválidos'),
]

