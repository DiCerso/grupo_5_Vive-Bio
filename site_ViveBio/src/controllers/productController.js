const path = require("path");
const { Category, Property, Product, ProductImage } = require("../database/models");
const { validationResult } = require('express-validator');
const toThousand = (n) =>
    n
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    all: async (req, res) => {
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

            return res.render("products/all", {
                toThousand,
                category,
                bioCapilar,
                bioCorporal,
                bioSpa,
            });
        } catch (error) {
            console.log(error);
        }
    },

    card: async (req, res) => {
        try {
        let product = await db.Product.findByPk(req.params.id, {
            include : [
                {association: 'productImages'}, { association: "property" }
            ]
        });
        let relacionados = await db.Product.findAll({
            where: {
                category_id: {
                  [Op.like]: product.category_id,
                },
              },
            limit : 3,
            include: [{ association: "productImages" }, { association: "property" }],
        })

            return res.render('products/card',{toThousand, product, relacionados})
    }
    catch (error) {
        console.log(error)
    }},

    //view form add product
    add: (req, res) => {
        let categories = db.Category.findAll({ order: ["name"] });
        let properties = db.Property.findAll({ order: ["name"] });
        Promise.all([categories, properties])
            .then(([categories, properties]) => {
                return res.render("products/add", { categories, properties });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    //method to save new product
    store:  (req, res) => {
            Product.create(
                {   
                    name: req.body.name,
                    description: req.body.description,
                    ingredients : req.body.ingredients,
                    price: +req.body.price,
                    stock: +req.body.stock,
                    volume : req.body.volume,
                    discount: +req.body.discount,
                    category_id: +req.body.category,
                    property_id: +req.body.property,
            })
                .then (product => {
                    if(req.files.length > 0){
                        let images = req.files.map(({filename},i) => {
                            let image = {
                                name : filename,
                                product_id : product.id,
                                primary : 1
                            }
                            return image
                        })
                        db.productImages.bulkCreate(images)
                            .then( (result) => console.log(result))		
                    }
                    return res.redirect('products/list', {product } )
                })
            
            .catch (error => console.log(error))
            
        
    },

    //view form edit product
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id, {
            include: ["productImages"],
        });
        let categories = db.Category.findAll({ order: ["name"] });
        let properties = db.Property.findAll({ order: ["name"] });

        Promise.all([product, categories, properties])
            .then(([product, categories, properties]) => {
                return res.render("products/edit", { product, categories, properties });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    //method to save edit product
    update: (req, res) => {
            Product.update(
                {   
                    name: req.body.name,
                    description: req.body.description,
                    ingredients : req.body.ingredients,
                    price: +req.body.price,
                    stock: +req.body.stock,
                    volume : req.body.volume,
                    discount: +req.body.discount,
                    category_id: +req.body.category,
                    property_id: +req.body.property,
            },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            )
                .then(async () => {
                    if (req.file) {
                        try {
                            await ProductImage.update(
                                {
                                    file: req.file.filename,
                                },
                                {
                                    where: {
                                        product_id: req.params.id,
                                        primary: 1,
                                    },
                                }
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    return res.redirect("/products/list");
                })
                .catch((error) => {
                    console.log(error);
                });
        } ,
    remove: (req, res) => {
        Product.destroy({
            where: {
                id: req.params.id,
            },
            force: true
        })
            .then(() => {
                return res.redirect("/products/list");
            })
            .catch((error) => {
                console.log(error);
            });
    },

    search: (req, res) => {
        db.Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: req.query.keyword } },

                ],
            },
            include: ["productImages"],
        })
            .then((result) => {
                return res.render("products/search", {
                    toThousand,
                    result,
                    keyword : req.query.keyword,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    list: (req, res) => {
        const products = Product.findAll();

        const bioCapilar = Product.findAll({
            where: {
                category_id: 1,
            },
        });
        const bioCorporal = Product.findAll({
            where: {
                category_id: 2,
            },
        });
        const bioSpa = Product.findAll({
            where: {
                category_id: 3,
            },
        });
        Promise.all([products, bioCapilar, bioCorporal, bioSpa])
            .then(([products, bioCapilar, bioCorporal, bioSpa]) => {
                return res.render("products/list", {
                    toThousand,
                    products,
                    bioCapilar,
                    bioCorporal,
                    bioSpa,
                });
            })
            .catch((error) => {
                console.log(error);
            });
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
            return res.render('products/Cart', {
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
