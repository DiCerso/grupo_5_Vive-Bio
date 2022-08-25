const path = require("path");
const fs = require('fs')
const { validationResult } = require('express-validator');
const { getUrl, isNumber } = require('../../helpers')
const db = require("../../database/models");
const { Op } = require("sequelize");
const { response } = require("express");

module.exports = {
    all: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include: [
                    { association: 'productImages' }, { association: 'property' }, { association: 'category' }
                ]
            });
            let response = {
                ok: true,
                meta: {
                    status: 200,
                    total: products.length,
                },
                url: getUrl(req),
                data: products
            }
            return res.status(200).json(response);


        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },

    card: async (req, res) => {
        try {
            let confirm = isNumber(req.params.id, req, "id");
            if (confirm) {
                return res.status(400).json(confirm);
            }

            let product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'productImages' }, { association: "property" }, { association: "category" }
                ]
            });

            if (product) {
                response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: product
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    url: getUrl(req),
                    msg: "No se encuentra un producto con el id ingresado"
                }
                return res.status(400).json(response);
            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    store: async (req, res) => {
        let errors = validationResult(req);
        try {
            let category = isNumber(req.body.category, req, "category");
            if (category) {
                return res.status(400).json(category)
            }
            let volume = isNumber(req.body.volume, req, "volume");
            if (volume) {
                return res.status(400).json(volume)
            }
            let price = isNumber(req.body.price, req, "price");
            if (price) {
                return res.status(400).json(price)
            }
            let discount = isNumber(req.body.discount, req, "discount");
            if (discount) {
                return res.status(400).json(discount)
            }
            let stock = isNumber(req.body.stock, req, "stock");
            if (stock) {
                return res.status(400).json(stock)
            }
            let property = isNumber(req.body.property, req, "property");
            if (property) {
                return res.status(400).json(property)
            }
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
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

                /* return res.send(products) aca ya esta para el producto con la primera imagen*/
                /* return res.send(productimage) aca ya tengo las imagenes */

                if (imagen.length > 0) {
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        data: [
                            { "product": products },
                            { "images": productimage }
                        ]
                    }
                    return res.status(200).json(response)
                } else {
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        data: products
                    }
                    return res.status(200).json(response)
                }


            } catch (error) {
                let response = {
                    ok: false,
                    meta: {
                        status: 500,
                    },
                    url: getUrl(req),
                    msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
                }
                return res.status(500).json(response);
            }
        } else {
            let images = req.files.map(image => image.filename);
            images.forEach(image => {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image)) && image !== "noimage.jpg") {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', image))
                }
            });
            try {

            } catch (error) {
                let response = {
                    ok: false,
                    meta: {
                        status: 500,
                    },
                    url: getUrl(req),
                    msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
                }
                return res.status(500).json(response);
            }
        }
    },
    update: async (req, res) => {
        try {
            let category = isNumber(req.body.category, req, "category");
            if (category && req.body.category) {
                return res.status(400).json(category)
            }
            let volume = isNumber(req.body.volume, req, "volume");
            if (volume && req.body.volume) {
                return res.status(400).json(volume)
            }
            let price = isNumber(req.body.price, req, "price");
            if (price && req.body.prince) {
                return res.status(400).json(price)
            }
            let discount = isNumber(req.body.discount, req, "discount");
            if (discount && req.body.discount) {
                return res.status(400).json(discount)
            }
            let stock = isNumber(req.body.stock, req, "stock");
            if (stock && req.body.stock) {
                return res.status(400).json(stock)
            }
            let property = isNumber(req.body.property, req, "property");
            if (property && req.body.property) {
                return res.status(400).json(property)
            }
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
        try {
            const product = await db.Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!product) {
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    url: getUrl(req),
                    msg: "No se encuentra un producto con el id ingresado"
                }
                return res.status(400).json(response);
            }
            const olds = await db.ProductImage.findAll({
                where: {
                    product_id: req.params.id
                }
            })
            if (olds) {
                const OldImages = olds.map(old => old.name);
            }

            const update = await db.Product.update({
                name: req.body.name ? req.body.name : product.name,
                category_id: req.body.category ? req.body.category : product.category,
                volume: +req.body.volume ? req.body.volume : product.volume,
                price: +req.body.price ? req.body.price : product.price,
                discount: +req.body.discount ? req.body.discount : product.discount,
                ingredients: req.body.ingredients ? req.body.ingredients.trim() : product.ingredients.trim(),
                description: req.body.description ? req.body.description : product.description,
                stock: +req.body.stock ? req.body.stock : product.stock,
                property_id: req.body.property ? req.body.property : product.property
            }, {
                where: {
                    id: req.params.id
                }
            })
            const products = await db.Product.findByPk(req.params.id)
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
            let images = await db.ProductImage.findAll({
                where: {
                    product_id: req.params.id
                }
            })
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: [
                    { "product": products },
                    { "images": images }
                ]
            }
            return res.status(200).json(response)
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }

    },
    remove: async (req, res) => {
        try {

            if (isNumber(req.params.id, req, "id")) {
                return res.status(400).json(isNumber(req.params.id, req, "id"))
            }

            const product = await db.Product.findByPk(req.params.id)

            if (!product) {
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    url: getUrl(req),
                    msg: "No se encuentra un producto con el id ingresado"
                }
                return res.status(400).json(response);
            }


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
            if (destroyProduct) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    msg: "El producto se ha eliminado exitosamente"
                }
                return res.status(200).json(response)
            }


        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },

    search: async (req, res) => {

        try {
            let products = await db.Product.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.substring]: req.query.keyword } },
                    ],
                },
                include: ["productImages"],
            })

            if (products.length != 0) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: { "product": products }
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se encuentra un producto con esos caracteres"
                }
                return res.status(400).json(response);
            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    findone: async (req, res) => {

        try {
            let products = await db.Product.findOne({
                where: {
                    name: req.query.keyword
                },
                include: ["productImages"],
            })

            if (products) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: products
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No existe este producto"
                }
                return res.status(400).json(response);
            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
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
            const user = await db.User.findByPk(+req.session.userLogin.id)

            cart.forEach(cart => {
                total += (+cart.product.price) * cart.cant
            })

            cart.forEach(cart => {
                desc += (+cart.product.price - ((+cart.product.price * +cart.product.discount) / 100)) * cart.cant
            })
            if (cart) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: [
                        cart,
                        { payments: payments },
                        { total: total },
                        { desct: desc },
                        { user: user }
                    ]
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    data: "No se encontró un carrito"
                }
                return res.status(400).json(response);
            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    removecart: async (req, res) => {
        try {
            let { id } = req.body
            if (id == 0) {
                let products = await db.Cart.destroy({
                    where: {
                        user_id: +req.session.userLogin.id
                    }
                })
                if (products) {
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        msg: "Se eliminaron los productos del carrito exitosamente"
                    }
                    return res.status(200).json(response)
                }
            } else {
                let product = await db.Cart.destroy({
                    where: {
                        product_id: id,
                        user_id: +req.session.userLogin.id
                    }
                })
                if (product) {
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        msg: "Se eliminó el producto del carrito exitosamente"
                    }
                    return res.status(200).json(response)
                }
            }


            return res.redirect('/Products/cart')
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    addcart: async (req, res) => {
        try {
            let { id } = req.body;
            if (id) {
                let newproduct = await db.Cart.create({
                    user_id: +req.session.userLogin.id,
                    product_id: id,
                    cant: 1
                })
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: newproduct
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    msg: "No se ingresó un producto para agregar al carrito"
                }
                return res.status(400).json(response);
            }
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    cant: async (req, res) => {
        try {
            let { id, idproduct } = req.body
            if (id && idproduct) {
                let cart = await db.Cart.update({
                    cant: id
                },
                    {
                        where: {
                            product_id: idproduct,
                            user_id: +req.session.userLogin.id
                        }
                    }
                )
                if (cart) {
                    let cart_act = await db.Cart.findAll({
                        where: {
                            product_id: idproduct,
                            user_id: +req.session.userLogin.id
                        }
                    })
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        msg: `La cantidad del producto ${idproduct} correctamente`,
                        data: cart_act
                    }
                    return res.status(200).json(response)
                }

            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    categories: async (req, res) => {
        try {
            let category = await db.Category.findAll({
                include: [
                    { association: 'products' }
                ]
            });
            let response = {
                ok: true,
                meta: {
                    status: 200,
                    total: category.length,
                },
                url: getUrl(req),
                data: category
            }
            return res.status(200).json(response);
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    categorySearch: async (req, res) => {
        try {
            let category = await db.Category.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.substring]: req.query.keyword } },
                    ],
                },
                include: ["products"],
            })

            if (category.length != 0) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: { "categories": category }
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "no se encuentra un usuario con esos caracteres"
                }
                return res.status(400).json(response);
            }

        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    categoryDelete: async (req, res) => {
        try {
            if (isNumber(req.params.id, req, "id")) {
                return res.status(400).json(isNumber(req.params.id, req, "id"))
            }

            const categoria = await db.Category.findByPk(req.params.id)

            if (!categoria) {
                let response = {
                    ok: false,
                    meta: {
                        status: 400,
                    },
                    url: getUrl(req),
                    msg: "No se encuentra una categoría con el id ingresado"
                }
                return res.status(400).json(response);
            }

            const destroycategory = await db.Category.destroy({
                where: {
                    id: req.params.id
                },
                force: true
            })
            if (destroycategory) {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    msg: "La categoría se ha eliminado exitosamente"
                }
                return res.status(200).json(response)
            }


        } catch (error) {
            console.log(error)
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    orderCreate: async (req, res) => {
        try {
            let { status,user_id, payment_id, total, products_id, num, amount } = req.body
            if (!user_id) {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó ningun usuario"
                }
                return res.status(400).json(response);
            } else if (!payment_id) {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó ninguna forma de pago"
                }
                return res.status(400).json(response);
            } else if (!total) {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó el precio total"
                }
                return res.status(400).json(response);
            } else if (!products_id) {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó un producto para agregar a la orden"
                }
                return res.status(400).json(response);
            } else if (!num) {
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó un valor para el numero de orden"
                }
                return res.status(400).json(response);
            }else if(!status){
                let response = {
                    ok: true,
                    meta: {
                        status: 400
                    },
                    url: getUrl(req),
                    msg: "No se ingresó ningun status"
                }
                return res.status(400).json(response);
            }
            let neworder = await db.Order.create({
                user_id: user_id,
                payment_id,
                total,
                products_id : +products_id,
                number : num,
                status_id : status,
                amount : amount
            })
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: neworder
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    orders : async (req, res) => {
        try {
            let orderdata = await db.Order.findAll({
                order : [['number', 'DESC']]
            });
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: orderdata
            }
            return res.status(200).json(response);
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    OrdersSearch : async (req, res) => {
        try {
            let {id} = req.params;
            let dato = await db.Order.findAll({
                where : {
                    user_id : id
                },
                order : [
                    ['number', 'DESC']
                ],
                include: [
                    { association: 'products' }
                ]
            });
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: dato
            }
            return res.status(200).json(response);
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    Favorites: async (req, res) => {
        try {
            let {id} = req.params;
            let favourites = await db.Favourite.findAll({
                where : {
                    user_id : id
                },
                include: [
                    {
                        association: 'products',
                        include: [
                            { association: 'productImages' }
                        ]
                    }
                ]
            })
            let confirm = isNumber(id, req, "id");
            if (confirm) {
                return res.status(400).json(confirm);
            }
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: favourites
            }
            return res.status(200).json(response);
            
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    addFavourite: async (req, res) => {
        try {
            let { id } = req.body;
            if (id) {
                let newfavourite = await db.Favourite.create({
                    user_id: +req.session.userLogin.id,
                    product_id: id
                })
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    data: newfavourite
                }
                return res.status(200).json(response);
            } else {
                let response = {
                    ok: true,
                    meta: {
                        status: 200
                    },
                    url: getUrl(req),
                    msg: "No se ingresó un producto para agregar a favoritos"
                }
                return res.status(400).json(response);
            }
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    deleteFavourite : async (req, res) => {
        try {
            let { id } = req.body
                let favorite = await db.Favourite.destroy({
                    where: {
                        product_id: id,
                        user_id: +req.session.userLogin.id
                    }
                })
                if (favorite) {
                    let response = {
                        ok: true,
                        meta: {
                            status: 200
                        },
                        url: getUrl(req),
                        msg: "Se eliminó el producto de la lista de favoritos exitosamente"
                    }
                    return res.status(200).json(response)
                }
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response);
        }
    },
    favoritesSearch : async (req, res) => {
        try {
            let {id} = req.params;
            let dato = await db.Favourite.findAll({
                where : {
                    user_id : +req.session.userLogin.id,
                    product_id : id
                }
            });
            let response = {
                ok: true,
                meta: {
                    status: 200
                },
                url: getUrl(req),
                data: dato
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log(error)
            /* let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
            }
            return res.status(500).json(response); */
        }
    },

}
