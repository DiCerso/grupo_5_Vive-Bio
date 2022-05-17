const products = require('../data/products');
const path = require('path');

module.exports = {
    Card : (req,res) => res.render('products/productCard'),
    All : (req,res) => res.render('products/productAll'),
    Cart : (req,res) => res.render('products/productCart'),
    add : (req,res) => res.render('products/addProducts'),
    edit : (req,res) => res.render('products/editProducts')
}
