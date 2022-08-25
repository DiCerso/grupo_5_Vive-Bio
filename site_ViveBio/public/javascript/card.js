let boton = document.querySelector('.add_product_cart')

let line = document.querySelector('.card_barra');

let cart = async function () {
    try {
        let vali = await fetch('/api/products/cart', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let result = await vali.json();
        return result

    } catch (error) {
        console.log(error)
    }
}

let EliminateProduct = async function (product) {
    try {
            let vali = await fetch('/api/products/cart/remove', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: (product),
                })
            })
    } catch (error) {
        console.log(error)
    }
}

let Addproduct = async function(product) {
    try {
        let vali = await fetch('/api/products/cart/addcart', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: (product),
            })
        })
        let response = await vali.json()

    } catch (error) {
    console.log(error)
}
}



let cart_action = async function(value){
    try {
    let carrito = await cart();
    let product = carrito.data[0].filter(producto => producto.product_id === +value);
    if(product.length != 0){
        await EliminateProduct(value)
        document.querySelector(`.cart_barra_${value}`).style.display = "none";
        document.querySelector(`.cart_button_${value}`).style.backgroundColor = "rgba(208, 237, 202, 0.5)";
    }else{
        await Addproduct(value);
        document.querySelector(`.cart_barra_${value}`).style.display = "block";
        document.querySelector(`.cart_button_${value}`).style.backgroundColor = "#D9E66B";
    }
    } catch (error) {
        console.log(error)
    }
    
}



window.addEventListener('load', async function () {
    console.log("card success!!!")
    try {
        let carrito = await cart();
        let product = carrito.data[0].filter(producto => producto.product_id === +boton.value);
        if(product.length != 0){
            line.style.display = "block";
            boton.style.backgroundColor = "#D9E66B"
        }

        

        boton.addEventListener('click',async function(e){
            let carrito = await cart();
            let product = carrito.data[0].filter(producto => producto.product_id === +boton.value);
            if(product.length != 0){
                await EliminateProduct(boton.value)
                line.style.display = "none";
                boton.style.backgroundColor = "rgba(208, 237, 202, 0.5)"
            }else{
                await Addproduct(boton.value);
                line.style.display = "block";
                boton.style.backgroundColor = "#D9E66B"
            }
        })




    } catch (error) {

    }



})