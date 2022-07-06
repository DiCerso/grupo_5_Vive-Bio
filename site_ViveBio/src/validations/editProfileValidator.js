const { check, body } = require('express-validator');
const db = require('../database/models')
const { Op } = require('sequelize')
module.exports = [
    check('firstname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    check('lastname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail()
        .isAlpha().withMessage('Solo se aceptan letras en este campo.'),

    body('username')
        .isLength({ min: 4, max: 8 }).withMessage('El usuario debe contener entre 4 y 8 caracteres.').bail()
        .custom((value, { req }) => {
            return db.User.findAll({
                where: {
                    id: {
                        [Op.not]: req.params.id
                    },
                    username: {
                        [Op.not]: value
                    }
                }

            })
                .then(user => {
                    return Promise.reject(user)
                })

                .catch(() => Promise.reject('Este usuario ya se encuentra en uso.'))

        })
    /* if (user) {
        return Promise.reject()
    }
}).catch(() => Promise.reject('Este usuario ya se encuentra en uso.')) */


]
