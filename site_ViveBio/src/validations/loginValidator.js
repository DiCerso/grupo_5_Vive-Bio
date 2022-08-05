const {body} = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    
    body('username')
        .notEmpty().withMessage('Por favor, ingresa tu usuario.').bail(),
    
    body('password')
        .notEmpty().withMessage('Por favor, ingresa tu contraseña.').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
                where : {
                    username : req.body.username
                }
            }).then(user => {
                if(!user || !bcryptjs.compareSync(value,user.password)){
                    return Promise.reject()
                }
            }).catch(() => Promise.reject('Usuario o contraseña incorrectos.'))
            
        })
]

