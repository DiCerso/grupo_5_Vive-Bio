
let select_list = document.querySelector(".select__list")
let container = document.querySelector(".list__products")
let cates = document.querySelector(".list__cates")
let tipo = document.querySelector(".list__price")
let buscador = document.querySelector(".list__busqueda")
let inputbuscador = document.querySelector(".list__barra")
let value;


select_list?.addEventListener('change', async function (e) {
    if (e.target.value == "2") { //user
        tipo.textContent = "rango";
        cates.innerHTML = `
        <div class="list__cates1" style="width:100%;">
            <a class="list__cate" style="cursor: pointer;" onclick="changeuser(0)">TODOS</a>
            <a class="list__cate" style="cursor: pointer; margin-top: 2px; margin-bottom:2px;" onclick="changeuser(1)">administradores</a>
            <a class="list__cate" style="cursor: pointer;" onclick="changeuser(2)">usuarios</a>
        </div>`
        value = 2;
        changeuser(0);
    } else if (e.target.value == "1") {//product
        tipo.textContent = "precio";
        cates.innerHTML = `
        <div class="list__cates1">
            <a class="list__cate" style="cursor: pointer;" onclick="changeproduct(0)">TODOS</a>
            <a class="list__cate" style="cursor: pointer;" onclick="changeproduct(1)">BioCapilar</a>
        </div>
        <div class="list__cates2">
            <a class="list__cate"style="cursor: pointer;"  onclick="changeproduct(2)">BioCorporal</a>
            <a class="list__cate" style="cursor: pointer;" onclick="changeproduct(3)">BioSpa</a>
        </div>`
        value = 1
        changeproduct(0);
    } else if (e.target.value == "3") {//category
        tipo.textContent = "productos";
        cates.innerHTML = `
        <div class="list__cates1" style="width:100%;">
            <a class="list__cate" style="cursor: pointer;"  onclick="changecategory(0)">TODOS</a>
        </div>`
        value = 3
        changecategory(0);
    }
})



let changeuser = async function (value) {
    try {
        let result = await fetch("/api/users/all")
        let users = await result.json()
        if (value == 0) {
            container.innerHTML = null

            users.data.forEach(user => {
                if (user.rol.id != 3) {
                    container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id" >
                                    ${user.id}
                                </a>
                                <a class="list__name">
                                    ${user.username}
                                </a>
                                <h4 class="list__price">${user.rol.name}
                                </h4>
                                <div class="list__options">
                                    <button class="list__delete" title="Eliminar usuario"
                                        onclick="EliminateUser(${user.id}, ${value})">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="list__edit button__${user.id}" title="editar usuario"
                                        onclick="changeroluser(${user.rol.id}, ${user.id}, ${value})">
                                    </button>
                                </div>
                    </article>`
                    if (user.rol.id == 1) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i>`
                    } else if (user.rol.id == 2) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i>`
                    }
                }
            });
        } else if (value == 1) {
            container.innerHTML = null
            users.data.forEach(user => {
                if (user.rol.id != 3 && user.rol.id == 1) {
                    container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id">
                                    ${user.id}
                                </a>
                                <a class="list__name">
                                    ${user.username}
                                </a>
                                <h4 class="list__price">${user.rol.name}
                                </h4>
                                <div class="list__options">
                                    <button class="list__delete" type="submit" title="Eliminar producto"
                                    onclick="EliminateUser(${user.id}, ${value})">
                                        <i class="fa-solid fa-trash-can"></i></button>
                                    <button class="list__edit button__${user.id}" title="editar usuario"
                                        onclick="changeroluser(${user.rol.id},${user.id}, ${value})">
                                    </button>
                                </div>
                    </article>`
                    if (user.rol.id == 1) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i>`
                    } else if (user.rol.id == 2) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i>`
                    }
                }

            });
        } else if (value == 2) {
            container.innerHTML = null
            users.data.forEach(user => {
                if (user.rol.id != 3 && user.rol.id == 2) {
                    container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id" >
                                    ${user.id}
                                </a>
                                <a class="list__name" >
                                    ${user.username}
                                </a>
                                <h4 class="list__price">${user.rol.name}
                                </h4>
                                <div class="list__options">
                                    <button class="list__delete" type="submit" title="Eliminar producto"
                                        onclick="EliminateUser(${user.id}, ${value})">
                                        <i class="fa-solid fa-trash-can"></i></button>
                                    <button class="list__edit button__${user.id}" title="editar usuario"
                                        onclick="changeroluser(${user.rol.id},${user.id}, ${value})">
                                    </button>
                                </div>
                    </article>`
                    if (user.rol.id == 1) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i>`
                    } else if (user.rol.id == 2) {
                        document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i>`
                    }
                }
            });
        }

    } catch (error) {
        console.log(error)
    }
}

let changeproduct = async function (value) {
    try {
        let result = await fetch("/api/products")
        let products = await result.json()
        if (value == 0) {
            container.innerHTML = null
            products.data.forEach(product => {
                container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id" href="/products/card/${product.id}">
                                    ${product.id}
                                </a>
                                <a class="list__name" href="/products/card/${product.id}">
                                    ${product.name}
                                </a>
                                <h4 class="list__price">$${product.price}
                                </h4>
                                <div class="list__options">
                                        <button class="list__delete" type="submit" title="Eliminar producto" onclick="EliminateProduct(${product.id}, ${value})">
                                            <i class="fa-solid fa-trash-can"></i></button>
                                    <a href="/products/edit/${product.id}" class="list__edit"
                                        title="Editar producto"><i class="fa-solid fa-pen"></i></a>
                                </div>
                    </article>`
            });
        } else if (value == 1) {
            container.innerHTML = null
            products.data.forEach(product => {
                if (product.category_id == 1) {
                    container.innerHTML += `
                <article class="list__product">
                            <a class="list__id" href="/products/card/${product.id}">
                                ${product.id}
                            </a>
                            <a class="list__name" href="/products/card/${product.id}">
                                ${product.name}
                            </a>
                            <h4 class="list__price">$${product.price}
                            </h4>
                            <div class="list__options">
                                <form method="POST" action="/products/remove/${product.id}?_method=DELETE"
                                    id="eliminar-producto">
                                    <button class="list__delete" type="submit" title="Eliminar producto">
                                        <i class="fa-solid fa-trash-can"></i></button>
                                </form>
                                <a href="/products/edit/${product.id}" class="list__edit"
                                    title="Editar producto"><i class="fa-solid fa-pen"></i></a>
                            </div>
                </article>`
                }
            });
        } else if (value == 2) {
            container.innerHTML = null
            products.data.forEach(product => {
                if (product.category_id == 2) {
                    container.innerHTML += `
                <article class="list__product">
                            <a class="list__id" href="/products/card/${product.id}">
                                ${product.id}
                            </a>
                            <a class="list__name" href="/products/card/${product.id}">
                                ${product.name}
                            </a>
                            <h4 class="list__price">$${product.price}
                            </h4>
                            <div class="list__options">
                                <form method="POST" action="/products/remove/${product.id}?_method=DELETE"
                                    id="eliminar-producto">
                                    <button class="list__delete" type="submit" title="Eliminar producto">
                                        <i class="fa-solid fa-trash-can"></i></button>
                                </form>
                                <a href="/products/edit/${product.id}" class="list__edit"
                                    title="Editar producto"><i class="fa-solid fa-pen"></i></a>
                            </div>
                </article>`
                }
            });
        } else if (value == 3) {
            container.innerHTML = null
            products.data.forEach(product => {
                if (product.category_id == 3) {
                    container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id" href="/products/card/${product.id}">
                                    ${product.id}
                                </a>
                                <a class="list__name" href="/products/card/${product.id}">
                                    ${product.name}
                                </a>
                                <h4 class="list__price">$${product.price}
                                </h4>
                                <div class="list__options">
                                    <form method="POST" action="/products/remove/${product.id}?_method=DELETE"
                                        id="eliminar-producto">
                                        <button class="list__delete" type="submit" title="Eliminar producto">
                                            <i class="fa-solid fa-trash-can"></i></button>
                                    </form>
                                    <a href="/products/edit/${product.id}" class="list__edit"
                                        title="Editar producto"><i class="fa-solid fa-pen"></i></a>
                                </div>
                    </article>`
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}

let changecategory = async function (value) {
    try {
        let result = await fetch("/api/products/categories")
        let categories = await result.json()
        console.log(categories)
        if (value == 0) {
            container.innerHTML = null
            categories.data.forEach(category => {
                container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id">
                                    ${category.id}
                                </a>
                                <a class="list__name" >
                                    ${category.name}
                                </a>
                                <h4 class="list__price">${category.products.length}
                                </h4>
                                <div class="list__options">
                                </div>
                    </article>`
            });
        }
    } catch (error) {
        console.log(error)
    }
}


let EliminateUser = async function (value, dato) {
    try {
        let result = await fetch(`/api/users/destroy/${value}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let user = await result.json()
        changeuser(dato)
    } catch (error) {
        console.log(error)
    }
}

let EliminateProduct = async function (id, value) {
    try {
        let result = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let user = await result.json()
        changeproduct(value)
    } catch (error) {
        console.log(error)
    }
}


let changeroluser = async function (rol, id, value) {
    try {
        let result = await fetch(`/api/users/changerol`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rol: rol,
                id: id
            })
        })
        let user = await result.json()

        changeuser(value)
    } catch (error) {
        console.log(error)
    }
}

let categorySearch = async function (value) {
    try {
        let result = await fetch(`/api/products/categories/search?keyword=${value}`)
        let categories = await result.json()
        console.log(categories)
        container.innerHTML = null
        categories.data.categories.forEach(category => {
            container.innerHTML += `
                <article class="list__product">
                            <a class="list__id">
                                ${category.id}
                            </a>
                            <a class="list__name" >
                                ${category.name}
                            </a>
                            <h4 class="list__price">${category.products.length}
                            </h4>
                            <div class="list__options">
                            </div>
                </article>`
        });
    } catch (error) {
        console.log(error)
    }

}



let userSearch = async function (value) {
    let result = await fetch(`/api/users/search?keyword=${value}`)
    let users = await result.json()
    console.log(users)
    container.innerHTML = null
    users.data.user.forEach(user => {
        if (user.rol.id != 3) {
            container.innerHTML += `
            <article class="list__product">
                        <a class="list__id" >
                            ${user.id}
                        </a>
                        <a class="list__name">
                            ${user.username}
                        </a>
                        <h4 class="list__price">${user.rol.name}
                        </h4>
                        <div class="list__options">
                            <button class="list__delete" title="Eliminar usuario"
                                onclick="EliminateUser(${user.id}, ${value})">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <button class="list__edit button__${user.id}" title="editar usuario"
                                onclick="changeroluser(${user.rol.id}, ${user.id}, ${value})">
                            </button>
                        </div>
            </article>`
            if (user.rol.id == 1) {
                document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i>`
            } else if (user.rol.id == 2) {
                document.querySelector(`.button__${user.id}`).innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i>`
            }
        }
    });
}



let productSearch = async function (value) {
    try {
        let result = await fetch(`/api/products/search?keyword=${value}`)
        let products = await result.json()
        console.log(products)
        container.innerHTML = null
        products.data.product.forEach(product => {
            container.innerHTML += `
                    <article class="list__product">
                                <a class="list__id" href="/products/card/${product.id}">
                                    ${product.id}
                                </a>
                                <a class="list__name" href="/products/card/${product.id}">
                                    ${product.name}
                                </a>
                                <h4 class="list__price">$${product.price}
                                </h4>
                                <div class="list__options">
                                    <form method="POST" action="/products/remove/${product.id}?_method=DELETE"
                                        id="eliminar-producto">
                                        <button class="list__delete" type="submit" title="Eliminar producto">
                                            <i class="fa-solid fa-trash-can"></i></button>
                                    </form>
                                    <a href="/products/edit/${product.id}" class="list__edit"
                                        title="Editar producto"><i class="fa-solid fa-pen"></i></a>
                                </div>
                    </article>`
        });
    } catch (error) {
        console.log(error)
    }
}

buscador.addEventListener('submit', async function (e) {
    e.preventDefault()
    if (select_list) {
        if (value == 1) {
            productSearch(inputbuscador.value);
        } else if (value == 2) {
            userSearch(inputbuscador.value);
        } else if (value == 3) {
            categorySearch(inputbuscador.value);
        }
    } else {
        productSearch(inputbuscador.value);
    }
})


window.addEventListener('load', async function () {
    console.log("list success!!!")
    value = 1;
    changeproduct(0);


});