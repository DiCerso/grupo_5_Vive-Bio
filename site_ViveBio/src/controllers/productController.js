const path = require('path');

module.exports = {
    Card : (req,res) => res.render(path.resolve('./src/views/products/productCard')),
<<<<<<< HEAD
        /*
        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        return res.render('productCard',{
            product
        })*/

=======
>>>>>>> 580aece38d9b9ac8ca7aec9eb05430421ff10fdb
    All : (req,res) => res.render(path.resolve('./src/views/products/productAll')),
    Cart : (req,res) => res.render(path.resolve('./src/views/products/productCart')),
    add : (req,res) => res.render(path.resolve('./src/views/products/addProducts')),
    edit : (req,res) => res.render(path.resolve('./src/views/products/editProducts'))
}

<<<<<<< HEAD
=======

      /*
        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        return res.render('productCard',{
            product
        })*/
>>>>>>> 580aece38d9b9ac8ca7aec9eb05430421ff10fdb
