
let container = document.querySelector('.cart_container');
let articles = document.querySelector('.cart_articles')
let total = document.querySelector('.total');
let totalDesc = document.querySelector('.total_desc')
let popup = document.querySelector('#cart_popup');
let btnclose = document.querySelector('#cart_btn-close-popup')
let savechanges = document.querySelector(".cart_change_ubi")
let insertubication = document.querySelector(".insert_ubication")
let inputubication = document.querySelector(".cart_ubication_name");
let payment = document.querySelector(".cart_select_payment");
let tota = document.querySelector(".total");


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
        total.value = "$" + carrito.data[2].total
        totalDesc.value = "$" + carrito.data[3].desct

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
                        ${dato.product.name}
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

let provincias = async function (dat) {
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/provincias')
        let provinces = await response.json();
        if (dat != "No hay ubicación") {
            let dato = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&nombre=' + dat);
            let datoMuni = await dato.json()
            provinces.provincias.forEach(provincia => {
                if (datoMuni.localidades[0].provincia.nombre == provincia.nombre) {
                    document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}" selected> ${provincia.nombre} </option>`
                    actMuni(dat)
                } else {
                    document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}"> ${provincia.nombre} </option>`
                }
            })
        } else {
            provinces.provincias.forEach(provincia => {
                document.querySelector("#provinciaSelect").innerHTML += `<option value="${provincia.nombre}"> ${provincia.nombre} </option>`
            })
        }
    } catch (error) {
        console.log(error);
    }
}

let actMuni = async function (ubication) {
    try {
        let response = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=' + document.querySelector("#provinciaSelect").value);
        let result = await response.json()
        let Muni = document.querySelector("#municipioSelect")
        if (!ubication) {
            Muni.innerHTML = `<option value="">Seleccione un Municipio</option>`
            result.localidades.forEach(localidad => {
                Muni.innerHTML += `<option value="${localidad.nombre}"> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado
            })
        } else {
            result.localidades.forEach(localidad => {
                if (ubication == localidad.nombre) {
                    Muni.innerHTML += `<option value="${localidad.nombre}" selected> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado

                }
                Muni.innerHTML += `<option value="${localidad.nombre}"> ${localidad.nombre} </option>` //agrego un option con el nombre de la provincia cargado
            })
        }
    } catch (error) {
        console.log(error)
    }
}

let ubicacion = async function (dato) {
    inputubication.value = dato;
    document.querySelector(".insert_ubication").textContent = "Cambiar Domicilio"
}

btnclose.addEventListener('click', () => {
    popup.classList.remove('show-popup')
})

insertubication.addEventListener('click', () => {
    popup.classList.add('show-popup')
    inputubication.innerHTML
    provincias(inputubication.value)
})

let ubicationuser = async function (ubication, id) {
    try {
        let vali = await fetch('/api/users/changeubication', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                ubication: ubication
            })
        })
    } catch (error) {
        console.log(error)
    }
}

savechanges.addEventListener('click', async function () {
    try {
        popup.classList.remove('show-popup')
        let selectMuni = document.querySelector("#municipioSelect")
        let ubication = selectMuni.value;
        ubicacion(ubication)
        let carrito = await cart();
        await carga(carrito);
        let usuario = carrito.data[4].user
        if (ubication != '') {
            await ubicationuser(ubication, usuario.id);
        } else {
            inputubication.value = "No hay ubicación"
            await ubicationuser(null, id);
        }
    } catch (error) {
        console.log(error)
    }
})

let purchase = async function () {
    try {
        let car = await cart();
        if (inputubication.value == "No hay ubicación" || inputubication.value == "") {
            Swal.fire({
                title: "Tiene que ingresar una ubicacion!",
                icon: "warning",
                position: 'center'
            })
        } else if (payment.value == "0") {
            Swal.fire({
                title: "Tiene que ingresar un metodo de pago",
                icon: "warning",
                position: 'center'
            })
        } else if (car.data[0].length == 0) {
            Swal.fire({
                title: "No hay productos ingresados",
                icon: "warning",
                position: 'center'
            })
        } else {
            createOrder(1);
            Swal.fire({
                title: "Compra realizada con exito",
                icon: "success",
                position: 'center'
            })
        }
    } catch (error) {
        console.log(error)
    }

}
let ultimaOrden = async function () {
    try {
        let vali = await fetch('/api/products/orders')
        let result = await vali.json()
        return result;
    } catch (error) {
        console.log(error)
    }
}


let createOrder = async function (product) {
    try {
        let carrito = await cart();
        await carga(carrito);
        let id = carrito.data[4].user.id
        let ultimaOr = await ultimaOrden()
        carrito.data[0].forEach(async function (producto) {
            let vali = await fetch('/api/products/createOrder', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 2,
                    user_id: id,
                    payment_id: payment.value,
                    total: carrito.data[2].total,
                    products_id: producto.id,
                    num: ultimaOr.data.length != 0 ? (ultimaOr.data[0].number + 1) : 1,
                    amount: producto.cant
                })
            })
        })
        EliminateProduct(0)
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener('load', async function () {
    console.log("cart success!!!")
    let carrito = await cart();
    await carga(carrito);
    let usuario = carrito.data[4].user
    if (usuario.ubication != null) {
        ubicacion(carrito.data[4].user.ubication)
    }
})