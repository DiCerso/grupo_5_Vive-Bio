const fs = require('fs');
const path  = require('path')
const category = require('../data/categories');
const db = require('../database/models');


module.exports = {
    index : (req, res) =>{
        let products = db.Product.findAll({
            order : [
                ['visits', 'ASC']
            ],
            limit : 4, 
            include : [
                {association: 'productImages'}
            ]
        })
        let category = db.Category.findAll()

        Promise.all([products, category])
        .then(([products, category]) => {
            return res.render('index', {
                products,
                category
            })
        })
        .catch(error => console.log(error))

    }
}