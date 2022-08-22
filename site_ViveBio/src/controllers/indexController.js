const db = require('../database/models');
const toThousand = (n) =>
    n
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    index: async (req, res) => {
        
        try {
            let products = await db.Product.findAll({
                limit: 10,
                include: [
                    { association: 'productImages' },
                    { association: 'property' }
                ]
            })
            let category = await db.Category.findAll({
                limit: 3
            })

            return res.render('index', {
                products,
                category,
                toThousand
            })
        } catch (error) {
            console.log(error);
        }
    }
}