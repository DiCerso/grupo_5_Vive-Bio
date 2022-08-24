const { check, body } = require('express-validator');
const db = require('../database/models')
const { Op } = require('sequelize')
module.exports = [
    check('firstname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail(),

    check('lastname')
        .isLength({ min: 2 }).withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail(),

    body('username')
        .isLength({ min: 4, max: 8 }).withMessage('El usuario debe contener entre 4 y 8 caracteres.').bail()
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    username: value,
                    id: {
                        [Op.not]: req.params.id
                    }
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject()
                    }
                })
                .catch(() => Promise.reject('Este usuario ya se encuentra en uso.'))
        })
]
