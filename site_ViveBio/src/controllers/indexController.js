const db = require('../database/models')

module.exports = {
    index : (req, res) =>{
        const products = db.Product.findAll({
            order : [
                ['visits','DESC']
            ],
            limit : 4,
            include : [
                {association : 'productimages'}
            ]
        })
        const categories = db.Category.findAll()

        Promise.all([products,categories])
            .then (([products,categories]) => {
                /* return res.send(products) */
                return res.render('index',{
                    products,
                    categories
                })
            } )
        }
}