const path = require("path");
const { Category, Product, ProductImage } = require("../database/models");
const toThousand = (n) =>
    n
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");

const accent_map = {
    á: "a",
    é: "e",
    è: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "a",
    É: "e",
    è: "e",
    Í: "i",
    Ó: "o",
    Ú: "u",
};

function accent_fold(s) {
    if (!s) {
        return "";
    }
    var ret = "";
    for (var i = 0; i < s.length; i++) {
        ret += accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;
}

module.exports = {
    all: async (req, res) => {
        try {
            const category = await db.Category.findAll();
            const bioCapilar = await db.Product.findAll({
                where: {
                    category_id: 1,
                },
                include: [{ association: "images" }, { association: "property" }],
            });
            const bioCorporal = await db.Product.findAll({
                where: {
                    category_id: 2,
                },
                include: [{ association: "images" }, { association: "property" }],
            });
            const bioSpa = await db.Product.findAll({
                where: {
                    category_id: 3,
                },
                include: [{ association: "images" }, { association: "property" }],
            });

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

    card: (req, res) => {
        let product = Product.findByPk(req.params.id, {
            include: [
                { association: "images" },
                { association: "property" },
                { association: "category" },
            ],
        });
        let relacionados = Product.findAll({
            where: {
                    order : [
                        ['category']
                    ],
                    limit : 3, 
                    include : [
                        {association: 'images'}
                    ]
        }})
        Promise.all([product, relacionados])
        .then(([product, relacionados]) => {
            return res.render("products/card/" + product.id, { product, relacionados });
        })
        .catch((error) => {
            console.log(error);
        });
    },

    //view form add product
    add: (req, res) => {
        let categories = Category.findAll({ order: ["name"] });
        let properties = Property.findAll({ order: ["name "] });
        Promise.all([categories, properties])
            .then(([categories, properties]) => {
                return res.render("products/add", { categories, properties });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    //method to save new product
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            Product.create({
                ...req.body,
                name: req.body.name.trim(),
                price: +req.body.price,
                discount: +req.body.discount,
                category_id: +req.body.category,
                property_id: +req.body.property,
            })
                .then((product) => {
                    if (req.files.length > 0) {
                        let images = req.files.map(({ filename }, i) => {
                            let image = {
                                file: filename,
                                product_id: product.id,
                                primary: i === 0 ? 1 : 0,
                            };
                            return image;
                        });
                        ProductImage.bulkCreate(images, { validate: true }).then((result) =>
                            console.log(result)
                        );
                    }
                    return res.redirect(`/products/all`);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Category.findAll()
                .then((categories) => {
                    return res.render("products/add", {
                        categories,
                        old: req.body,
                        errors: errors.mapped(),
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    //view form edit product
    edit: (req, res) => {
        let product = Product.findByPk(req.params.id, {
            include: ["images"],
        });
        let categories = Category.findAll({ order: ["name"] });
        let properties = Property.findAll({ order: ["name"] });

        Promise.all([product, categories, properties])
            .then(([product, categories, properties]) => {
                return res.render("products/all", { product, categories, properties });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    //method to save edit product
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            Product.update(
                {
                    ...req.body,
                    price: +price,
                    discount: +discount,
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
                    return res.redirect("/products/all");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            errors = errors.mapped();
            let product = Product.findByPk(req.params.id, {
                include: ["images"],
            });
            let categories = Category.findAll({ order: ["name"] });
            let properties = Property.findAll({ order: ["name "] });
            Promise.all([product, categories])
                .then(([product, categories]) => {
                    return res.render("products/edit", {
                        product,
                        categories,
                        properties,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    remove: (req, res) => {
        Product.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(() => {
                return res.redirect("products/list");
            })
            .catch((error) => {
                console.log(error);
            });
    },

    search: (req, res) => {
        const keyword = req.query.toLowerCase();
        db.Products.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: keyword } },
                    { description: { [Op.substring]: keyword } },
                    { property: { [Op.substring]: keyword } },
                ],
            },
            include: ["images"],
        })
            .then((result) => {
                return res.render("products/search", {
                    toThousand,
                    accent_map,
                    result,
                    keyword,
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
            let total = 0,
                desc = 0;
            const payments = await db.Payment.findAll();
            const cart = await db.Cart.findAll({
                where: {
                    user_id: +req.session.userLogin.id,
                },
                include: [
                    {
                        association: "product",
                        include: [{ association: "images" }],
                    },
                ],
            });
            cart.forEach((cart) => {
                total += +cart.product.price;
            });

            cart.forEach((cart) => {
                desc +=
                    +cart.product.price -
                    (+cart.product.price * +cart.product.discount) / 100;
            });
            return res.render("products/cart", {
                payments,
                cart,
                total,
                desc,
            });
        } catch (error) {
            console.log(error);
        }
    },
    removecart: async (req, res) => {
        try {
            if (req.params.id == 0) {
                await db.Cart.destroy({
                    where: {
                        user_id: +req.session.userLogin.id,
                    },
                });
            } else {
                await db.Cart.destroy({
                    where: {
                        product_id: req.params.id,
                        user_id: +req.session.userLogin.id,
                    },
                });
            }

            return res.redirect("/products/cart");
        } catch (error) {
            console.log(error);
        }
    },
    cant: async (req, res) => {
        let { id, idproduct } = req.params;
        try {
            await db.Cart.update(
                {
                    cant: id,
                },
                {
                    where: {
                        product_id: idproduct,
                        user_id: +req.session.userLogin.id,
                    },
                }
            );
            return res.redirect("/products/cart");
        } catch (error) {
            console.log(error);
        }
    },
};
