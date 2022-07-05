const db = require('../database/models')
const path = require('path');
const fs = require('fs');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const accent_map = { 'á': 'a', 'é': 'e', 'è': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'a', 'É': 'e', 'è': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u' };
function accent_fold(s) {
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
        ret += accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;
};


module.exports = {
    Card: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        const relation = products.filter(relation => +relation.category === +product.category)
        return res.render('products/productCard', { products, toThousand, relation, product, category });
    },
    All: (req, res) => {
        const bioCapilar = db.Product.findAll({
            where: {
                category_id: 1
            },
            include: [
                { association: 'productimages' },
                { association: 'properties' },
                { association: 'categories' }
            ]
        })
        const bioCorporal = db.Product.findAll({
            where: {
                category_id: 2
            },
            include: [
                { association: 'productimages' },
                { association: 'properties' },
                { association: 'categories' }
            ]
        })
        const bioSpa = db.Product.findAll({
            where: {
                category_id: 3
            },
            include: [
                { association: 'productimages' },
                { association: 'properties' },
                { association: 'categories' }
            ]
        })

        Promise.all([bioCapilar, bioCorporal, bioSpa])
            .then(([bioCapilar, bioCorporal, bioSpa]) => {
                /* return res.send(bioCapilar) */
                return res.render('products/productAll', { toThousand, bioCapilar, bioCorporal, bioSpa });
            })
            .catch(error => console.log(error))

        /* const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const bioCapilar = products.filter(product => +product.category === 1);
        const bioCorporal = products.filter(product => +product.category === 2);
        const bioSpa = products.filter(product => +product.category === 3);
        return res.render('products/productAll', { products, toThousand, category, bioCapilar, bioCorporal, bioSpa }); */
    },
    add: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        return res.render('products/addProducts', { category });
    },
    store: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const { name, category, price, description, property, volume, discount } = req.body;
        const lastId = products[products.length - 1].id;
        const image = req.files.map(image => image.filename);

        products.push({
            name,
            category: +category,
            volume,
            discount,
            property,
            price,
            description,
            id: (+lastId + 1),
            image: image.length > 0 ? image : ["noimage.jpg"]
        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8');

        return res.redirect('/products/All');
    },
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const { id } = req.params;
        let product = products.find(product => product.id === +id)
        return res.render('products/editProducts', { product, category })
    },
    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        let { name, category, price, description, discount, volume, property } = req.body;
        let { id } = req.params;
        let oldProduct = products.find(product => +product.id === +id);
        let oldImage = oldProduct.image;
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
                    image: image.length > 0 ? image : oldImage
                }

                if (req.files.length > 0) {
                    product.image.forEach(image => {
                        if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', image)) && image !== "noimage.jpg") {
                            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', image))
                        }
                    });
                }
                return productact;
            }
            return product;
        });
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productact, null, 3), 'utf-8');
        return res.redirect('/products/All')

    },
    remove: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const { id } = req.params;

        const productFilter = products.filter(product => product.id !== +id);
        const productdeleted = products.filter(product => product.id === +id);


        productdeleted[0].image.forEach(image => {
            if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', image)) && image !== "noimage.jpg") {
                fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', image));
            }
        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(productFilter, null, 3), 'utf-8')

        return res.redirect('/products/All');
    },
    search: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        const keywords = accent_fold(req.query.keyboard.toLowerCase());
        let result = products.filter(product => accent_fold(product.name.toLowerCase()).includes(keywords))
        return res.render('products/productSearch', { result })

    },
    list: (req, res) => {
        const { category } = req.params;
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json')));
        let keyboard = req.query.keyboard;
        if (keyboard) {
            keyboard = accent_fold(keyboard.toLowerCase());
            products = products.filter(product => accent_fold(product.name.toLowerCase()).includes(keyboard))
            return res.render('products/list', { products });
        }
        if (category == 0) {
            return res.render('products/list', { products });
        } else if (category == 1) {
            products = products.filter(product => +product.category === 1);
            return res.render('products/list', { products });
        } else if (category == 2) {
            products = products.filter(product => +product.category === 2);
            return res.render('products/list', { products });
        } else if (category == 3) {
            products = products.filter(product => +product.category === 3);
            return res.render('products/list', { products });
        }

    },
    cart: (req, res) => {
        const payments = db.Payment.findAll()
        Promise.all([payments])    
        .then(([payments]) => {
            /* return res.send(payments) */
                return res.render('products/productCart',{
                    payments
                })
            })
    }

}