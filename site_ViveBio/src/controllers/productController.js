const path = require('path');

module.exports = {
    Card : (req,res) => res.render(path.resolve('./src/views/products/productCard')),
        /*
        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        return res.render('productCard',{
            product
        })*/

    All : (req,res) => res.render(path.resolve('./src/views/products/productAll')),
    Cart : (req,res) => res.render(path.resolve('./src/views/products/productCart')),
    add : (req,res) => res.render(path.resolve('./src/views/products/addProducts')),
    edit : (req,res) => res.render(path.resolve('./src/views/products/editProducts'))
}
