const db = require('../database/models');


module.exports = {
    index : async (req, res) =>{

        try {
            let products = await db.Product.findAll({
                order : [
                    ['visits', 'ASC']
                ],
                limit : 4, 
                include : [
                    {association: 'productImages'}
                ]
            })
            let category = await db.Category.findAll()
            
                return res.render('index', {
                    products,
                    category
                })
        } catch (error) {
            console.log(error);
        }




    }
}