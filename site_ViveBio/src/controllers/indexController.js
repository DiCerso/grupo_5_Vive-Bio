const fs = require('fs');
const path  = require('path')
const category = require('../data/categories');
const db = require('../database/models');


module.exports = {
    index : (req, res) =>{
        db.Product.findAll()
        .then(products => {
            return res.send(products)
        })
        .catch(error => console.log(error))

        /* return res.render('index', {
            products,
            category
        }) */
    }
}