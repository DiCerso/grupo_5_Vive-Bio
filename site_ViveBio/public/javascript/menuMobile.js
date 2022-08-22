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
const btnfavdesk= document.querySelector('#btn_delete_favourite_desk')
btnMenu.addEventListener("click", function () {
    burger.classList.toggle('active')
    navclose.classList.toggle('active')
    menu.classList.toggle("mostrar")
});

btnSearch.addEventListener('click',()=>{
    boxSearch.classList.add('activeSearch')
})

window.addEventListener('mouseup', (event) => {
    if(event.target != inpSearch){
        boxSearch.classList.remove('activeSearch')
    }
})

btnfav1.addEventListener('click',()=>{
    boxfav.classList.toggle('activefav')
})

closefav.addEventListener('click',()=>{
    boxfav.classList.remove('activefav')
})

btnfavdesk.addEventListener('click',()=>{
    boxfav.classList.toggle('activefav')
})




