const { check } = require('express-validator');
const users = require('../data/users.json');

module.exports = [
    check('firstName')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('lastName')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('username')
        .isLength({ min: 4, max: 8 }).withMessage('El usuario debe contener entre 4 y 8 caracteres.').bail()
        .custom((value) => {
            const usersOut = users.map(user => user.user !== value);
            const user = usersOut.find(user => user.user === value);
            if (user) {
                return false;
            } else {
                return true;
            }
        }).withMessage('Este usuario ya se encuentra registrado.')
]
