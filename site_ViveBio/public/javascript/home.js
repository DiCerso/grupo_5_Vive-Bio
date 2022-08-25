const containerCarrousel = document.querySelector('#carrouselContainer')
const productsCarrousel = document.querySelectorAll('#carrouselContainer article')


containerCarrousel.addEventListener('mouseover',()=>{
    productsCarrousel[0].classList.add('disableMove')

})

containerCarrousel.addEventListener('click',()=>{
    productsCarrousel[0].classList.add('disableMove')

})

containerCarrousel.addEventListener('mouseout',()=>{
    productsCarrousel[0].classList.remove('disableMove')

})


