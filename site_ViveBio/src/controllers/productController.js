const path = require('path');
const Category = require('../database/models/Category');
const Product = require('../database/models/Product');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')

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

    All: async (req, res) => {

        try {
        const category = await db.Category.findAll()
        const bioCapilar = await db.Product.findAll({
            where : {
                category_id : 1
            },
            include : [
                {association: 'productImages'},
                {association : 'property'}
            ]
        })
        const bioCorporal = await db.Product.findAll({
            where : {
                category_id : 2
            },
            include : [
                {association: 'productImages'},
                {association : 'property'}
            ]
        })
        const bioSpa = await db.Product.findAll({
            where : {
                category_id : 3
            },
            include : [
                {association: 'productImages'},
                {association : 'property'}
            ]

            
        })

        return res.render('products/productAll', { toThousand, category, bioCapilar, bioCorporal, bioSpa });

        } catch (error) {
            console.log(error)
        }
    },

    Card: (req, res) => {
        Product.findByPk(req.params.id)
        .then(product => {
            return res.render('products/productCard', { toThousand, product });
        })
        .catch(error => console.log(error));
    },

    add: (req, res) => {
        Category.findAll()
        .then(categories => {
            return res.render('products/addProducts', { categories });
        })
    },

    store: (req, res) => {
        Product.create({
            name : req.body.name,
            category_id : req.body.category,
            volume : req.body.volume,
            price : req.body.price,
            discount : req.body.discount,
/*             IMAGES */
            ingredients : req.body.ingredients,
            description : req.body.description,
            stock : req.body.stock,
            property_id : req.body.property
        })
        return res.redirect('/products/All');
    },

    edit: (req, res) => {
        let productId = Product.findByPk(req.params.id)
        let categoryResult = Category.findAll()
        Promise.All([productId, categoryResult])
        .then(function([product,categories]){
            return res.render('products/editProducts', { product, categories })
        })

    },

    update: (req, res) => {
        Product.update({
            name : req.body.name,
            category_id : req.body.category,
            volume : req.body.volume,
            price : req.body.price,
            discount : req.body.discount,
/*             IMAGES */
            ingredients : req.body.ingredients,
            description : req.body.description,
            stock : req.body.stock,
            property_id : req.body.property
        },{
            where : {
                id : req.params.id
            }
        })
            res.redirect('/products/' + req.params.id)

        },

    remove: (req, res) => {
        Product.destroy({
            where : {
                id : req.params.id
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
    list : (req, res) => {

        Product.findAll()
        .then(products => {
            return res.render('products/list', {products});
        })
        .catch(error => console.log(error));
        
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