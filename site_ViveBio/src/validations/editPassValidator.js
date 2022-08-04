const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [

    body('Newpassword')
        .isLength({ min: 5, max: 12 }).withMessage('La contraseña debe poseer entre 5 y 8 caracteres').bail()
        .isAlphanumeric().withMessage('La contraseña debe tener al menos 1 caracter numérico'),

    body('Newpassword2')
        .custom((value, { req }) => {
            if (value === req.body.Newpassword) {
                return true;
            } else {
                return false;
            }
        }).withMessage('Las contraseñas no coinciden.'),

    body('OldPassword')
        .notEmpty().withMessage('Por favor, ingresa tu contraseña.').bail()
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    id: req.session.userLogin.id
                }
            }).then(user => {
                if (!user || !bcryptjs.compareSync(value, user.password)) {
                    return Promise.reject()
                }
            }).catch(() => Promise.reject('Campo invalido.'))

        })
]

