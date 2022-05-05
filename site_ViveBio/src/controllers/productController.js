module.exports = {
    Card: (req, res) => res.render('products/productCard'),
    All: (req, res) => res.render('products/productAll'),
    add: (req, res) => res.render('products/addProducts'),
    edit: (req, res) => res.render('products/editProducts')
}
/*
const {idProduct} = req.params;
const product = products.find(product => product.id === +idProduct);
return res.render('productCard',{
    product
})*/