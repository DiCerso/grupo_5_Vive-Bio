const db = require('../../database/models');
const {getUrl} = require('../../helpers')

module.exports = {
    index: async (req, res) => {

        try {
            let products = await db.Product.findAll({
                limit: 3,
                include: [
                    { association: 'productImages' },
                    { association: 'property' }
                ]
            })
            let category = await db.Category.findAll({

                limit: 3
            })

            let response = {
                ok: true,
                meta: {
                    status: 200,
                    total: products.length,
                },
                url: getUrl(req),
                data: [{products : products}, {category : category}]
            }
            return res.status(200).json(response);
        } catch (error) {
            let response = {
                ok: false,
                meta: {
                    status: 500,
                },
                url: getUrl(req),
                msg: error.messaje ? error.messaje : "comuniquese con el administrador"
            }
            return res.status(500).json(response);
        }

    }
}