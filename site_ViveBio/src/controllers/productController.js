const products = require('../data/products');
const category = require('../data/categories');
const path = require('path');
const fs = require('fs');


module.exports = {
    Card: (req, res) => {
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        return res.render('products/productCard', {products, product, category});
    },
    All: (req, res) => {
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        const bioCapilar = products.filter(product => product.category === 1);
        const bioCorporal = products.filter(product => product.category === 2);
        const bioSpa = products.filter(product => product.category === 3);
        return res.render('products/productAll', {products, product, category, bioCapilar, bioCorporal, bioSpa});
    },
    Cart: (req, res) => res.render('products/productCart'),
    add: (req, res) => {
        return res.render('products/addProducts', { category });
    },
    store: (req, res) => {
        const { name, category, price, description, property, volume, discount } = req.body;
        const lastId = products[products.length - 1].id;
        const image = req.file.filename;
        products.push({
            name,
            category,
            volume,
            discount,
            property,
            price,
            description,
            id: (+lastId + 1),
            image: image.length > 0 ? image : ["noimage.jpeg"]
        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8');

        return res.redirect('/')
    },
    edit: (req, res) => {
        const { id } = req.params;
        let product = products.find(product => product.id === +id)
        return res.render('products/editProducts', { product, category })

    },
    update: (req, res) => {
        let { name, category, price, description, discount, volume, property } = req.body;
        let { id } = req.params;
        let image = req.files.map(image => image.filename);

        let productact = products.map(product => {
            if (product.id === +id) {

                let productact = {
                    ...product,
                    name,
                    volume,
                    discount,
                    property,
                    category: +category,
                    price: +price,
                    description,
                    image: image ? image : product.image
                }
                if (req.files) {
                    if (fs.existsSync(path.resolve(__dirname, '..', 'public', 'images', product.img)) && product.img !== "noimage.jpeg") {
                        fs.unlinkSync(path.resolve(__dirname, '..', 'public', 'images', product.img))
                    }
                }
                return productact;
            }
            return product;
        });

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productact, null, 3), 'utf-8');
        return res.redirect('/')

    },
    remove: (req, res) => {
        const { id } = req.params;

        const productFilter = products.filter(product => product.id !== +id);

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productFilter, null, 3), 'utf-8')

        return res.redirect('/products/All');
    }
}
