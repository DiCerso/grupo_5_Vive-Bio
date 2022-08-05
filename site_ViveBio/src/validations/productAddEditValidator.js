const { body } = require("express-validator");
const db = require('../database/models');
module.exports = [
    body('name')
        .notEmpty().withMessage('Minimo 3 caracteres.').bail(),

    body('volume')
        .notEmpty().withMessage('Mínimo 2 números').bail(),

    body('stock')
        .notEmpty().withMessage('Minimo 1 número.').bail(),

    body('description')
        .notEmpty().withMessage('Mínimo 10 caracteres.').bail(),
]