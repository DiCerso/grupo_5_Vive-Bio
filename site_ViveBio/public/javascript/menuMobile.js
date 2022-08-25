const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const burger = document.querySelector("#burger")
const navclose = document.querySelector('.navClose')
const btnSearch = document.querySelector('#btnSearch')
const boxSearch = document.querySelector('.box_nav_search-mobile')
const inpSearch = document.querySelector('.navSearchBar')
const btnfav1 = document.querySelector('#btn_mob_favourite');
const boxfav = document.querySelector('#emergent_fav');
const closefav = document.querySelector('#close_fav');
const btnfavdesk = document.querySelector('#btn_delete_favourite_desk')
const articulos = document.querySelector('#articles_favourites');
btnMenu.addEventListener("click", function () {
    burger.classList.toggle('active')
    navclose.classList.toggle('active')
    menu.classList.toggle("mostrar")
});

btnSearch.addEventListener('click', () => {
    boxSearch.classList.add('activeSearch')
})

window.addEventListener('mouseup', (event) => {
    if (event.target != inpSearch) {
        boxSearch.classList.remove('activeSearch')
    }
})

btnfav1 && btnfav1.addEventListener('click', () => {
    boxfav.classList.toggle('activefav')
})

closefav.addEventListener('click', () => {
    boxfav.classList.remove('activefav')
})

btnfavdesk?.addEventListener('click', () => {
    boxfav.classList.toggle('activefav')
})

let usuarioUbication = async function (value) {
    try {
        let result = await fetch(`/api/users/search?keyword=${value}`)
        let users = await result.json()
        return users
    } catch (error) {
        console.log(error)
    }
}
let listFavourites = async function () {
    try {
        //esto trae los productos del favoritos de un usuario especifico
        if (document.querySelector(".header__user a p").innerHTML != "Logueate") {
            let dat = document.querySelector(".header__user a p").innerHTML
            let dato = await usuarioUbication(dat)
            let result = await fetch(`/api/products/favourites/${dato.data.user[0].id}`)
            let list = await result.json()
            return list;
        }
    } catch (error) {
        console.log(error)
    }
}

let favourites = async function (id) {
    try {
        let favoritos = await fetch('/api/products/addfavourite', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        let value = await favoritos.json();
        await favoriteGenerate()
    } catch (error) {
        console.log(error)
    }
}


let deleteFavorite = async function (id) {
    try {
        let favoritos = await fetch('/api/products/deleteFavourite', {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        await favoriteGenerate()
    } catch (error) {
        console.log(error)
    }
}

let verificateFavourite = async function(id){
    try {
        let result = await fetch(`/api/products/favouritesSearch/${id}`)
        let response = await result.json();
        if(response.data[0]){
        await deleteFavorite(id)
        await favoriteGenerate()
        }else{
        await favourites(id)
        await favoriteGenerate()
        }
    } catch (error) {
        console.log(error)
    }
}

let favoriteGenerate = async function(){
    try {

        let variable = await listFavourites()//tenes que crear una funcion que llame cada vez que haga un cambio en los favoritos para que recargue la vista con innerhtml
        if(variable.data.length == 0){
            articulos.innerHTML = `<p class="fav_empty">No se encuentra ningún producto</p>`
        }else{
            articulos.innerHTML = null
            variable.data.forEach(producto => {
                articulos.innerHTML += `
                <article class="box_favourite_product">
                <span class="icon_delete_favourite" id="btn_delete_favourite" ><i onclick="deleteFavorite(${producto.products.id})" class="fas fa-times-circle"></i></span>
                <div class="box_favourite_product_image">
                  <img class="favourite_product_image" src="/images/products/${producto.products.productImages[0].name}" alt="" />
                </div>
                <div class="box_favourite_product_description">
                  <span class="favourite_product_description">${producto.products.name}</span>
                </div>
              </article>`
            })
        }

    } catch (error) {
        console.log(error)
    }
}





window.addEventListener('load', async function () {
   await favoriteGenerate()
})