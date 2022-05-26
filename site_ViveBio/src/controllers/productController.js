const products = require('../data/products');
const category = require('../data/categories');
const path = require('path');
const fs = require('fs');

const read = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'products.json'))


module.exports = {
    Card: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json')));
        const { id } = req.params;
        const product = products.find(product => product.id === +id);
        const relation = products.filter(relation => +relation.category === +product.category)
        return res.render('products/productCard', {products,relation, product, category});
    },
    All: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json')));
        const bioCapilar = products.filter(product => product.category === 1);
        const bioCorporal = products.filter(product => product.category === 2);
        const bioSpa = products.filter(product => product.category === 3);
        return res.render('products/productAll', {products, category, bioCapilar, bioCorporal, bioSpa});
    },
    add: (req, res) => {
        return res.render('products/addProducts', { category });
    },
    store: (req, res) => {
        const products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json')));
        const { name, category, price, description, property, volume, discount } = req.body;
        const lastId = products[products.length - 1].id;
        const image = req.files.filename;

        products.push({
            name,
            category : +category,
            volume,
            discount,
            property,
            price,
            description,
            id: (+lastId + 1),
            image: image ? image : ["noimage.jpg"]
        })

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8');

        return res.redirect('/products/All')
    },
    edit: (req, res) => {
        const { id } = req.params;
        let product = products.find(product => product.id === +id)
        return res.render('products/editProducts', { product,category })
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
                    image: image.length > 0 ? image : product.image
                }
                if(req.files){
                    product.image.forEach(image => {
                        if(fs.existsSync(path.resolve(__dirname,'..','public','images',image)) && image !== "noimage.jpg"){
                            fs.unlinkSync(path.resolve(__dirname,'..','public','images',image))
                        }
                    });
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
    },
    search : (req, res) => {
        const keyboard = req.query.keyboard;

        const result = products.filter(product => product.name.toLowerCase().includes(keyboard.toLowerCase()))


        return res.render('products/productSearch', {result})


    }
}