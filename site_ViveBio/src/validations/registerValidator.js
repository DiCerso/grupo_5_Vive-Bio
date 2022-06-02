const {check, body} = require('express-validator');

module.exports = [
    
    check('firstName')
        .isLength({min:2,max:20}).withMessage('Mínimo dos letras').bail()
        .isAlpha().withMessage('Tu nombre sólo admite letras 😃'),
    
    check('lastName')
        .isLength({min:3,max:20}).withMessage('Mínimo tres letras').bail()
        .isAlpha().withMessage('Por favor, escribe tu apellido'),

    check('email')
        .notEmpty.withMessage('Por favor, ingresa dirección de correo electrónico').bail()
        .isEmail().withMessage('Debe ser un correo válido'),
    
    check('user')
        .isLength({min:3,max:20}).withMessage('Mínimo tres letras').bail()
        .isAlpha().withMessage('Por favor, crea tu nombre de usuario con letras.'),
    
    check('password')
        .isLength({min:5,max:8}).withMessage('La contraseña debe contener entre cinco y ocho caracteres'),
    
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas deben coincidir')

]