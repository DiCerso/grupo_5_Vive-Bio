const { check, body } = require("express-validator");
const db = require('../database/models');
module.exports = [
    body('name')
        .notEmpty().withMessage('La cantidad mínima de caracteres para es te campo es 2.').bail(),

    body('volume')
        .notEmpty().withMessage('La cantidad mínima de caracteres para es te campo es 1.').bail(),

    body('stock')
        .notEmpty().withMessage('La cantidad mínima de caracteres para es te campo es 1.').bail(),

    body('description')
        .notEmpty().withMessage('La cantidad mínima de caracteres para es te campo es 1.').bail(),
]