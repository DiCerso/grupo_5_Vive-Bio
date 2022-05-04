module.exports = {
    productCard : (req,res) => res.render('productCard'),
        /*
        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        return res.render('productCard',{
            product
        })*/

    productAll : (req,res) => res.render('productAll'),

    cart : (req,res) => res.render('productCart')
}