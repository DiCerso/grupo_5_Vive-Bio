const products = require('../data/products');
const category = require('../data/categories');


module.exports = {
    index : (req, res) =>{
        return res.render('index', {
            products,
            category
        })
    }
}