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

btnfavdesk.addEventListener('click', () => {
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
        //esto trae los productos del list de un usuario especifico
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
        //llama a una api para buscar el producto si existe en la lista de favoritos,le tenes que mandar solo el id por que busca el usuario por local
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
        return value
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('load', async function () {
    await favourites()
    let variable = await listFavourites()//tenes que crear una funcion que llame cada vez que haga un cambio en los favoritos para que recargue la vista con innerhtml
})

