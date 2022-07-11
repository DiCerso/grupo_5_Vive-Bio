const path = require('path');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')
const { Op } = require('sequelize')

module.exports = {

    All: async (req, res) => {

        try {
            const category = await db.Category.findAll()
            const bioCapilar = await db.Product.findAll({
                where: {
                    category_id: 1
                },
                include: [
                    { association: 'productImages' },
                    { association: 'property' }
                ]
            })
            const bioCorporal = await db.Product.findAll({
                where: {
                    category_id: 2
                },
                include: [
                    { association: 'productImages' },
                    { association: 'property' }
                ]
            })
            const bioSpa = await db.Product.findAll({
                where: {
                    category_id: 3
                },
                include: [
                    { association: 'productImages' },
                    { association: 'property' }
                ]


            })

            return res.render('products/productAll', { toThousand, category, bioCapilar, bioCorporal, bioSpa });

        } catch (error) {
            console.log(error)
        }
    },

    Card: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'productImages' },
                    { association: 'property' },
                    { association: 'category' }
                ]
            })
            const relations = await db.Product.findAll({
                where: {
                    category_id: product.category_id
                },
                include: [
                    { association: 'productImages' },
                    { association: 'property' },
                    { association: 'category' }
                ]

            })
            return res.render('products/productCard', {
                product,
                relations,
                toThousand
            })
        } catch (error) {
            console.log(error)
        }
    },

    add: (req, res) => {
        Category.findAll()
            .then(categories => {
                return res.render('products/addProducts', { categories });
            })
    },

    store: (req, res) => {
        Product.create({
            name: req.body.name,
            category_id: req.body.category,
            volume: req.body.volume,
            price: req.body.price,
            discount: req.body.discount,
            /*             IMAGES */
            ingredients: req.body.ingredients,
            description: req.body.description,
            stock: req.body.stock,
            property_id: req.body.property
        })
        return res.redirect('/products/All');
    },

    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id)
            const image = await db.ProductImage.findAll({
                where: {
                    product_id: req.params.id
                }
            })
            const property = await db.Property.findAll()
            const category = await db.Category.findAll()
            return res.render('products/editProducts', {
                product,
                image,
                property,
                category
            })
        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {
            const olds = await db.ProductImage.findAll({
                where: {
                    product_id: req.params.id
                }
            })
            const OldImages = olds.map(old => old.name);
            const image = req.files.map(image => image.filename);
            const update = await db.Product.update({
                name: req.body.name,
                category_id: req.body.category,
                volume: +req.body.volume,
                price: +req.body.price,
                discount: +req.body.discount,
                ingredients: req.body.ingredients.trim(),
                description: req.body.description.trim(),
                stock: +req.body.stock,
                property_id: req.body.property
            }, {
                where: {
                    id: req.params.id
                }
            })
            if (req.files.length > 0) {
                let images = req.files.map(({ filename }, i) => {
                    let image = {
                        name: filename,
                        product_id: req.params.id,
                        primary: i === 0 ? 1 : 0
                    }
                    return image
                })
                db.ProductImage.destroy({
                    where : {
                        product_id : req.params.id
                    }
                })
                db.ProductImage.bulkCreate(images, { validate: true })
                
                    .then((result) => console.log(result))
            }
            return res.redirect((`/products/Card/${req.params.id}`))
        } catch (error) {
            console.log(error)
        }
    },

    remove: async (req, res) => {

    },
    search: async (req, res) => {
        try {
            const result = await db.Product.findAll({
                where: {
                    name: {
                        [Op.substring]: req.query.keyboard
                    }
                },
                include: [
                    { association: 'productImages' },
                    { association: 'property' },
                    { association: 'category' }
                ]
            })
            return res.render('products/productSearch', {
                result,
                keyboard: req.query.keyboard
            })
        } catch (error) {
            console.log(error)
        }
    },
    list: (req, res) => {

        Product.findAll()
            .then(products => {
                return res.render('products/list', { products });
            })
            .catch(error => console.log(error));

    },
    cart: async (req, res) => {

        try {
            let total = 0, desc = 0;
            const payments = await db.Payment.findAll()
            const cart = await db.Cart.findAll(
                {
                    where: {
                        user_id: +req.session.userLogin.id
                    },
                    include: [
                        {
                            association: 'product',
                            include: [
                                { association: 'productImages' }
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
            return res.render('products/productCart', {
                payments,
                cart,
                total,
                desc
            })

        } catch (error) {
            console.log(error)
        }
    },
    removecart: async (req, res) => {
        try {
            if (req.params.id == 0) {
                await db.Cart.destroy({
                    where: {
                        user_id: +req.session.userLogin.id
                    }
                })
            } else {
                await db.Cart.destroy({
                    where: {
                        product_id: req.params.id,
                        user_id: +req.session.userLogin.id
                    }
                })
            }
            return res.redirect('/Products/cart')
        } catch (error) {
            console.log(error)
        }
    },
    cant: async (req, res) => {
        let { id, idproduct } = req.params
        try {
            await db.Cart.update({
                cant: id
            },
                {
                    where: {
                        product_id: idproduct,
                        user_id: +req.session.userLogin.id
                    }
                }
            )
            return res.redirect('/Products/cart')
        } catch (error) {
            console.log(error)
        }
    }


}