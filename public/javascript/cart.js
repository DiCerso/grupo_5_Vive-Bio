
let container = document.querySelector('.cart_container');
let articles = document.querySelector('.cart_articles')
let total = document.querySelector('.total');
let totalDesc = document.querySelector('.total_desc')

let CantMore = async function (product) {
    try {
        let carrito = await cart();
        let pro = carrito.data[0].filter(producto => producto.product.id == product)
        let vali = await fetch('/api/products/cart/cant', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: (pro[0].cant + 1),
                idproduct: product
            })
        })
        let result = await vali.json();
        document.getElementById(`cart_count_${product}`).textContent = result.data[0].cant;
        precio();
    } catch (error) {
        console.log(error)
    }
}

let CantLess = async function (product) {
    try {
        let carrito = await cart();
        let pro = carrito.data[0].filter(producto => producto.product.id === +product)
        if ((pro[0].cant - 1) == 0) {
            EliminateProduct(product)
        } else {
            let vali = await fetch('/api/products/cart/cant', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: (pro[0].cant - 1),
                    idproduct: product
                })
            })
            let result = await vali.json();
            document.getElementById(`cart_count_${product}`).textContent = result.data[0].cant;
            precio()
        }
    } catch (error) {
        console.log(error)
    }
}

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

let precio = async function () {
    try {
        let carrito = await cart();
        total.value = carrito.data[2].total
        totalDesc.value = carrito.data[3].desct

    } catch (error) {
        console.error
    }
}



let EliminateProduct = async function (product) {
    try {
        if (product) {
            let vali = await fetch('/api/products/cart/remove', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: (product),
                })
            })
            let carrito = await cart();
            await carga(carrito);
            precio();
        } else {
            let vali = await fetch('/api/products/cart/remove', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                })
            })
            let carrito = await cart();
            await carga(carrito);
            precio();
        }
    } catch (error) {
        console.log(error)
    }
}


let carga = async function (carrito) {
    articles.innerHTML = null;
    if (carrito.data[0].length > 0) {
        let products = carrito.data[0].map(producto => {
            return producto
        });


        products.forEach(dato => {
            articles.innerHTML += `
            <article class="cart_article_box article_${dato.product.id}">
            <div class="cart_sect_1">
                <div class="cart_sect_img">
                    <img src="/images/products/${dato.product.productImages[0].name}"
                        alt="">
                </div>
                <div class="cart_sect_description">
                    <p>
                        ${dato.product.description}
                    </p>
                </div>
            </div>
            <div class="cart_sect_2">
                <div class="cart_sect_count">
                    <button class="cart_box_more-less"  onclick="CantLess(${dato.product.id})" >-</button>
                    <div class="cart_box_count">
                        <span id="cart_count_${dato.product.id}">
                            ${dato.cant}
                        </span>
                    </div>
                    <button class="cart_box_more-less" onclick="CantMore(${dato.product.id})">+</button>
                </div>
                <div class="cart_sect_price">
                        <span>$${dato.product.price} </span>
                    </div>
                    <div class="cart_box_button">
                        <button href="/Products/cart/${dato.product.id}" class="cart_button button_eliminate" onclick="EliminateProduct(${dato.product.id})" >Eliminar</button>
                        <a href="/Products/Card/${dato.product.id}" class="cart_button">ver</a>
                    </div>
            </div>  
        </article>`
        });
        precio();

    } else {
        articles.innerHTML += '<h1 class="cart_problem">No se encuentran productos</h1>'
    }
}


window.addEventListener('load', async function () {
    console.log("cart success!!!")
    let carrito = await cart();
    await carga(carrito);
})