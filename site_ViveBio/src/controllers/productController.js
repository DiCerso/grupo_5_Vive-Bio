const path = require('path');
const Category = require('../database/models/Category');
const Product = require('../database/models/Product');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')
const {Op} = require('sequelize')

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

    all: async (req, res) => {

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

    card: (req, res) => {
        Product.findByPk(req.params.id,
            {
                include : [
                    {association: 'productImages'},
                    {association : 'property'},
                    {association : 'category'},
                ]
            })
        .then(product => {
            return res.render('products/card', { toThousand, product });
        })
        .catch((error)=>{
            console.log(error)
        })
    },

    add: (req, res) => {
        Category.findAll()
        .then(categories => {
            return res.render('products/add', { categories });
        })
        .catch((error)=>{
            console.log(error)
        })
    },

    store: (req, res) => {
            const { name, description, ingredients, volume, price, discount, stock, category_id, property_id} = req.body;
            Product.create({
                name, 
                description,
                ingredients,
                volume, 
                price,
                discount, 
                stock, 
                category_id,
                property_id,
            })
            .then ((product) => {
                return res.redirect('/products/all')
            })
            .catch((error)=>{
                console.log(error)
            })
    },

    edit: (req, res) => {

        Product.findByPk(req.params.id,
            {
                include: ['productImages'] 
            })
        let categories = Category.findAll()

        Promise.all([product, categories])
            .then(function([product,categories]){
                return res.render('products/edit', { product, categories })
            })
            .catch((error)=>{
                console.log(error)
            })
    },

    update: (req, res) => {
            const { name, description, ingredients, volume, price, discount, stock, category_id, property_id} = req.body;
            Product.update({
                name,
                description,
                ingredients,
                volume, 
                price,
                discount, 
                stock, 
                category_id,
                property_id
        },{
            where : {
                id : req.params.id
                }
            })
            .then((product)=>{
                res.redirect('/products/' + req.params.id)
            })
            .catch((error)=>{
                console.log(error)
            })
    },

    remove: (req, res) => {
            Product.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then(()=>{
                return res.redirect('products/list')
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    search: (req, res) => {
        const resultados = req.query.search.toLowerCase();
        db.Products.findAll({
            where: {
             name : {[Op.substring]: resultados},
             description : {[Op.substring]: resultados}
            },
            include : ['prouctImages'] 
          })
        .then(resultados => {
            return res.render('products/search', { toThousand, accent_map, resultados});
        })
        .catch((error)=>{
            console.log(error)
        })

    },
    list : (req, res) => {

            const products = Product.findAll()

            const bioCapilar = Product.findAll({
                where : {
                    category_id : 1
                }
            })
            const bioCorporal = Product.findAll({
                where : {
                    category_id : 2
                }
            })
            const bioSpa = Product.findAll({
                where : {
                    category_id : 3
                }
            })
            Promise.all([products, bioCapilar, bioCorporal,bioSpa,])
            .then(([products, bioCapilar, bioCorporal, bioSpa])=>{
                return res.render('products/list', { toThousand, products, bioCapilar, bioCorporal, bioSpa })
            })
            .catch((error)=>{
                console.log(error)
            })
        
    },
    cart: async (req, res) => {

        try {
            let total = 0, desc = 0;
            const payments = await db.Payment.findAll()
            const cart = await db.Cart.findAll(
                {
                    where : {
                        user_id : +req.session.userLogin.id
                    },
                    include : [
                    {
                            association: 'product',
                            include : [
                            {association: 'productImages'}
                            ]
                    }
                    ]
                }
            )
            cart.forEach(cart => {
                total += +cart.product.price
            })

            cart.forEach(cart => {
                desc += +cart.product.price - ((+cart.product.price * +cart.product.discount) / 100)
            })
            return res.render('products/cart',{
                payments,
                cart,
                total,
                desc
            })

        } catch (error) {
            console.log(error)
        }
    },
    removecart : async (req,res) => {
        try {
            if(req.params.id == 0){
                await db.Cart.destroy({
                    where : {
                        user_id : +req.session.userLogin.id
                    }
                }) 
            }else {
                await db.Cart.destroy({
                    where : {
                        product_id : req.params.id,
                        user_id : +req.session.userLogin.id
                    }
                })
            }
            
            return res.redirect('/products/cart')
        } catch (error) {
            console.log(error)
        }
    },
    cant : async (req, res) => {
        let {id, idproduct}= req.params
        try {
                await db.Cart.update({
                cant : id
            },
            {
                where : {
                    product_id : idproduct,
                    user_id : +req.session.userLogin.id
                }
            }
            )
            return res.redirect('/products/cart')
        } catch (error) {
            console.log(error)
        }
    }
    

}