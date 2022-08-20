const { check, body } = require('express-validator');
const db = require('../database/models')

module.exports = [
    check('firstname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail(),

    check('lastname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('email')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isEmail().withMessage('Ingresar un E-mail válido').bail()
        .custom((value) => {
            return db.User.findOne({
                where : {
                    email : value
                }
            }).then(user => {
                if(user){
                    return Promise.reject()
                }
            }).catch(() => Promise.reject('Este email ya se encuentra en uso.'))
        }),

    check('username')
        .isLength({ min: 4, max: 8 }).withMessage('El usuario debe contener entre 4 y 8 caracteres.').bail()
        .custom((value) => {
            return db.User.findOne({
                where : {
                    username : value
                }
            }).then(user => {
                if(user){
                    return Promise.reject()
                }
            }).catch(() => Promise.reject('Este usuario ya se encuentra en uso.'))
        }),

    check('password')
        .isLength({ min: 5, max: 12 }).withMessage('La contraseña debe poseer entre 5 y 8 caracteres').bail()
        .isAlphanumeric().withMessage('La contraseña debe tener al menos 1 caracter numérico'),

    body('password2')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                return true;
            } else {
                return false;
            }
        }).withMessage('Las contraseñas no coinciden, por favor ingresar nuevamente.'),

    check('terminos')
        .isString('on')
        .withMessage('Debes aceptar los términos y condiciones para registrarte.')
]
