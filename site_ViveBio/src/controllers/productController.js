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
                include: [
                    { association: 'productImages' }, { association: "property" }
                ]
            });
            let relacionados = await db.Product.findAll({
                where: {
                    category_id: {
                        [Op.like]: product.category_id,
                    },
                },
                limit: 3,
                include: [{ association: "productImages" }, { association: "property" }],
            })
            return res.render('products/card', { toThousand, product, relacionados })
        }
        catch (error) {
            console.log(error)
        }
    },

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
                    name: image.name,
                    product_id: image.product_id,
                    primary: 0
                }
                )
            })


            return res.redirect('/Products/All')
        } catch (error) {
            console.log(error)
        }


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
            /*try {
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
        }*/
    },

    //method to save edit product
    update: (req, res) => {
        Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                price: +req.body.price,
                stock: +req.body.stock,
                volume: req.body.volume,
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
            /*try {
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
        } */
    },
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
                    keyboard: req.query.keyword,
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
