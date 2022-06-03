const fs = require('fs');
const path  = require('path')
const category = require('../data/categories');
const products = require('../data/products')


module.exports = {
    index : (req, res) =>{
        let product1 = [], product2 = [], i;

        const product = products.filter(product => {
            if(product.dest == true){
                return product
            }
        });

        
        
        for(i = 0; i <= 3; i++){
            product1.push(product[i]);
        }
        for(i = 4; i <= 7; i++){
            product2.push(product[i]);
        }


        return res.render('index', {
            product1,
            product2,
            category
        })
    }
}