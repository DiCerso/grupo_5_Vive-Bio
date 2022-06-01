const { check, body } = require('express-validator');
const users = require('../data/users.json');

module.exports = [
    check('firstName')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('lastName')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('email')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isEmail().withMessage('Ingresar un E-mail válido').bail()
        .custom((value) => {
            const user = users.find(user => user.email === value);
            if (user) {
                return false;
            } else {
                return true;
            }
        }).withMessage('Este E-mail ya fue registrado.'),

    check('user')
        .isLength({ min: 4, max: 8 }).withMessage('El usuario debe contener entre 4 y 8 caracteres.').bail()
        .custom((value) => {
            const user = users.find(user => user.user === value);
            if (user) {
                return false;
            } else {
                return true;
            }
        }).withMessage('Este usuario ya se encuentra registrado.'),

    check('password')
        .isLength({ min: 5, max: 8 }).withMessage('La contraseña debe poseer entre 5 y 8 caracteres').bail()
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
