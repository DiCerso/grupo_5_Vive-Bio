const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
const burger = document.querySelector("#burger")
const navclose = document.querySelector('.navClose')
const btnSearch = document.querySelector('#btnSearch')
const boxSearch = document.querySelector('.box_nav_search-mobile')
const inpSearch = document.querySelector('.navSearchBar')

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

/* btnSearch.addEventListener('blur',()=>{
    boxSearch.classList.remove('activeSearch')
}) */

