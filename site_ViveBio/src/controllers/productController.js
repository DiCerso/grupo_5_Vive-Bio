const path = require('path');
const Category = require('../database/models/Category');
const Product = require('../database/models/Product');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models')
const { Op } = require('sequelize')

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

    Card: (req, res) => {
        Product.findByPk(req.params.id)
            .then(product => {
                return res.render('products/productCard', { toThousand, product });
            })
            .catch(error => console.log(error));
    },

    add: async (req, res) => {

        try {
            let category = await db.Category.findAll()
            let property = await db.Property.findAll()

            return res.render('products/addProducts', { category, property });

        } catch (error) {
            console.log(error)
        }
    },

    store: async (req, res) => {
        try {
            let cont = 0
            let image = req.files.map(image => image.filename);
            if (image.length < 1) {
                image = ["noimage.jpg"]
            }
            let product = await db.Product.findAll()

            let products = await db.Product.create({
                name: req.body.name,
                category_id: req.body.category,
                volume: req.body.volume,
                price: req.body.price,
                discount: req.body.discount,
                ingredients: req.body.ingredients,
                description: req.body.description,
                stock: req.body.stock,
                property_id: req.body.property,
                visits: 0,
                productImages: {
                    name: image[0],
                    primary: 1
                }
            },
                {
                    include: [
                        { association: 'productImages' }
                    ]
                }
            )

            /* let idmax = 0;
            product.forEach(product => {
                idmax = product.id
            }) */

            let idmax = await db.Product.findOne({
                where: {
                    name: req.body.name
                }
            })


            let imagen
            if (image.length > 1) {
                imagen = image.filter(image => {
                    if (cont != 0) {
                        cont++
                        return image
                    }
                    cont++
                })
            }

            let productimage = imagen.map(image => {
                return {
                    name: image,
                    product_id: idmax.id,
                    primary: 0
                }
            })

            productimage.forEach(async (image) => {
                console.log(image)
                let imageProduct = await db.ProductImage.create({
                    name : image.name,
                    product_id : image.product_id,
                    primary : 0
                }
                )
            })
            

            return res.redirect('/Products/All')
        } catch (error) {
            console.log(error)
        }



        /*         return res.redirect('/products/All');
         */


        /*         store: (req, res) => {
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
                    }) */
    },

    edit: (req, res) => {
        let productId = Product.findByPk(req.params.id)
        let categoryResult = Category.findAll()
        Promise.All([productId, categoryResult])
            .then(function ([product, categories]) {
                return res.render('products/editProducts', { product, categories })
            })

    },

    update: (req, res) => {
        Product.update({
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
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products/' + req.params.id)

    },

    remove: (req, res) => {
        Product.destroy({
            where: {
                id: req.params.id
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
    list: async (req, res) => {

        try {
            const { category } = req.params;
            let products = await db.Product.findAll({
                include: [
                    { association: 'category' }
                ]
            })
            let keyboard = req.query.keyboard;

            if (keyboard) {
                products = await db.Product.findAll({
                    where: {
                        name: {
                            [Op.substring]: keyboard
                        }
                    }
                })
                return res.render('products/list', { products });
            }
            if (category == 0) {
                return res.render('products/list', { products });
            } else if (category == 1) {
                products = await db.Product.findAll({
                    include: [
                        { association: 'category' }
                    ],
                    where: {
                        category_id: 1
                    }
                })
                return res.render('products/list', { products });
            } else if (category == 2) {
                products = await db.Product.findAll({
                    include: [
                        { association: 'category' }
                    ],
                    where: {
                        category_id: 2
                    }
                })
                return res.render('products/list', { products });
            } else if (category == 3) {
                products = await db.Product.findAll({
                    include: [
                        { association: 'category' }
                    ],
                    where: {
                        category_id: 3
                    }
                })
                return res.render('products/list', { products });
            }

        } catch (error) {
            console.log(error);
        }

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
                cant: +id,
                where: {
                    product_id: +idproduct,
                    user_id: +req.session.userLogin.id
                }
            })
            return res.redirect('/Products/cart')
        } catch (error) {
            console.log(error)
        }
    }

}