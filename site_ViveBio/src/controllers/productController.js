const path = require("path");
const fs = require('fs')
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
    add: async (req, res) => {
        try {
            const categories = await db.Category.findAll()
            const properties = await db.Property.findAll()
            return res.render('products/add', {
                categories,
                properties
            })
        } catch (error) {
            console.log(error)
        }
    },

    //method to save new product
    store: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
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

                let idmax = await db.Product.findOne({
                    where: {
                        name: req.body.name
                    }
                })

                let imagen = []
                if (image.length >= 2) {
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
        } else {
            let images = req.files.map(image => image.filename);
            images.forEach(image => {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image)) && image !== "noimage.jpg") {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image))
                }
            });
        
            try {
                const categories = await db.Category.findAll()
                const properties = await db.Property.findAll()
                return res.render('products/add', {
                    errores: errors.mapped(),
                    old: req.body,
                    properties,
                    categories
                })
            } catch (error) {
                console.log(error)
            }
        }
    },

    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'productImages' }
                ]
            })
            const properties = await db.Property.findAll()
            const categories = await db.Category.findAll()
            return res.render('products/edit', {
                product,
                properties,
                categories
            })
        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const olds = await db.ProductImage.findAll({
                    where: {
                        product_id: req.params.id
                    }
                })
                const OldImages = olds.map(old => old.name);
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
                    let newimages = req.files.map(({ filename }, i) => {
                        let image = {
                            name: filename,
                            product_id: req.params.id,
                            primary: i === 0 ? 1 : 0
                        }
                        return image
                    })
                    db.ProductImage.destroy({
                        where: {
                            product_id: req.params.id
                        }
                    })
                    OldImages.forEach(image => {
                        if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image)) && image !== "noimage.jpg") {
                            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image))
                        }
                    });
                    db.ProductImage.bulkCreate(newimages, { validate: true })
                        .then((result) => console.log(result))
                }
                return res.redirect((`/products/Card/${req.params.id}`))
            } catch (error) {
                console.log(error)
            }
        } else {
            let images = req.files.map(image => image.filename);
            images.forEach(image => {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image)) && image !== "noimage.jpg") {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image))
                }
            });
            try {
                const categories = await db.Category.findAll()
                const properties = await db.Property.findAll()
                const product = await db.Product.findByPk(req.params.id,{
                    include : [
                        {association : 'property'},
                        {association : 'category'}
                    ]
                })
                return res.render('products/edit', {
                    errores: errors.mapped(),
                    old: req.body,
                    properties,
                    categories,
                    product
                })
            } catch (error) {
                console.log(error)
            }
        }

    },
    remove: async (req, res) => {
        try {
            const images = await db.ProductImage.findAll({
                where: {
                    product_id: req.params.id
                }
            })
            const imagesDelete = images.map(image => image.name)
            imagesDelete.forEach(image => {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image)) && image !== "noimage.jpg") {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image))
                }
            });
            const destroyImages = await db.ProductImage.destroy({
                where: {
                    product_id: req.params.id
                },
                force: true
            })
            const destroyProduct = await db.Product.destroy({
                where: {
                    id: req.params.id
                },
                force: true
            })
            return res.redirect("/products/list");

        } catch (error) {
            console.log(error)
        }
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
        const products = db.Product.findAll();

        const bioCapilar = db.Product.findAll({
            where: {
                category_id: 1,
            },
        });
        const bioCorporal = db.Product.findAll({
            where: {
                category_id: 2,
            },
        });
        const bioSpa = db.Product.findAll({
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
