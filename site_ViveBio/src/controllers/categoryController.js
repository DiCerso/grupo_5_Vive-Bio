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
            return res.render("category/add");
        } catch (error) {
            console.log(error);
        }
    },

    //method to save new product
    store: async (req, res) =>  {
/*     let errors = validationResult(req);
        if(errors.isEmpty()){ */
           try{
            let { name, description} = req.body
            db.Category.create({
                name,
                description,
                image: req.file ? req.file.filename : "default-image.png"
            })
            return res.render("products/list")
            }catch (error) {
                console.log(error);
            }
        }
      /*   else{
        res.render('category/add',{
            errors: errors.mapped(),
            session: req.session,
            old: req.body
        })
    } */
            
,
        
    edit: async (req, res) => {
        const category = await db.Category.findByPk(req.params.id)
        try {
            return res.render("category/edit", {category});
        } catch (error) {
            console.log(error);
        }
    },


    update: async (req, res) => {
      /*   let errors = validationResult(req);
        if (errors.isEmpty()) { */
            try {
                const category =  await db.Category.findByPk(req.params.id)
                let { name, description} = req.body;
                await db.Category.update(
                    {
                        name,
                        description,
                        image: req.file ? req.file.filename : "default-image.png"
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                return res.redirect("/products/list");
                } catch (error) {
                console.log(error);
            }
                
    },
    
    remove: (req, res) => {
        db.Category.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(() => {
            return res.redirect('/products/list')
          })
        }
};

