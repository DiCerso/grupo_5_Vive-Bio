const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const toThousand = (n) =>
    n
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    
    //view form add category
    add: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            return res.render("category/add", {
                categories,
            });
        } catch (error) {
            console.log(error);
        }
    },

    //method to save new product
    store: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                
                let categories = await db.Category.create(
                    {
                        name: req.body.name,
                        description: req.body.description,
                        image: req.file ? req.file.filename : "default-image.png"
                    },
                );

                return res.redirect("category/add", {categories});
            } catch (error) {
                console.log(error);
            }
        } else {
            let images = req.files.map((image) => image.filename);

            try {
                const categories = await db.Category.findAll();
                return res.render("category/add", {
                    errores: errors.mapped(),
                    old: req.body,
                    categories,
                });
            } catch (error) {
                console.log(error);
            }
        }
    },

    edit: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            return res.render("category/edit", {
                categories,
            });
        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const OldImages = olds.map((old) => old.name);
                const update = await db.Category.update(
                    {
                        name: req.body.name,
                        description: req.body.description,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                if (req.files.length > 0) {
                    let newimages = req.files.map(({ filename }, i) => {
                        let image = {
                            name: filename,
                            product_id: req.params.id,
                            primary: i === 0 ? 1 : 0,
                        };
                        return image;
                    });
                    db.ProductImage.destroy({
                        where: {
                            product_id: req.params.id,
                        },
                    });
                    OldImages.forEach((image) => {
                        if (
                            fs.existsSync(
                                path.resolve(
                                    __dirname,
                                    "..",
                                    "..",
                                    "public",
                                    "images",
                                    "products",
                                    image
                                )
                            ) &&
                            image !== "noimage.jpg"
                        ) {
                            fs.unlinkSync(
                                path.resolve(
                                    __dirname,
                                    "..",
                                    "..",
                                    "public",
                                    "images",
                                    "products",
                                    image
                                )
                            );
                        }
                    });
                    db.ProductImage.bulkCreate(newimages, { validate: true }).then(
                        (result) => console.log(result)
                    );
                }
                return res.redirect("category/add");
            } catch (error) {
                console.log(error);
            }
        } else {
            let images = req.files.map((image) => image.filename);
            images.forEach((image) => {
                if (
                    fs.existsSync(
                        path.resolve(
                            __dirname,
                            "..",
                            "..",
                            "public",
                            "images",
                            "products",
                            image
                        )
                    ) &&
                    image !== "noimage.jpg"
                ) {
                    fs.unlinkSync(
                        path.resolve(
                            __dirname,
                            "..",
                            "..",
                            "public",
                            "images",
                            "products",
                            image
                        )
                    );
                }
            });
            try {
                const categories = await db.Category.findAll();
                const properties = await db.Property.findAll();
                const product = await db.Product.findByPk(req.params.id, {
                    include: [{ association: "property" }, { association: "category" }],
                });
                return res.render("category/edit", {
                    errores: errors.mapped(),
                    old: req.body,
                    properties,
                    categories,
                    product,
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    
    remove: (req, res) => {
        db.Category.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(() => {
            return res.redirect('/category/add')
          })
        }
};