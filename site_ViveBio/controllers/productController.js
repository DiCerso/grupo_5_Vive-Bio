module.exports = {
    Card : (req,res) => res.render('productCard'),
        /*
        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        return res.render('productCard',{
            product
        })*/

    All : (req,res) => res.render('productAll'),
    Cart : (req,res) => res.render('productCart'),
    add : (req,res) => res.render('addProducts'),
    edit : (req,res) => res.render('editProducts')
}