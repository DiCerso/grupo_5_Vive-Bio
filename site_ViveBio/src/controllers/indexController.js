const fs = require('fs');
const path  = require('path')
const category = require('../data/categories');
const products = require('../data/products')


module.exports = {
    index : (req, res) =>{

        return res.render('index', {
            products,
            category
        })
    }
}