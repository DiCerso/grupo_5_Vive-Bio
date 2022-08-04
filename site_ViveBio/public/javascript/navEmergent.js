const btnNavMobile = document.querySelector("#btnNavMob");
const emergente = document.querySelector("#emergente");
const solapa1 = document.querySelector("#solapa1");
const solapa2 = document.querySelector("#solapa2");

btnNavMobile && btnNavMobile.addEventListener("click",function(){
    emergente.classList.toggle("show_nav_mobile")
    solapa1.classList.toggle("active1")
    solapa2.classList.toggle("active2")
    btnNavMobile.classList.toggle("active3")
});