let intro = document.querySelector('.intro');
let letter = document.querySelector('.welcome-header');
let letterSpan = document.querySelectorAll('.letter');
let splashLogo = document.getElementById('pic')

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {

        letterSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 200)
        });

        setTimeout(() => {
            letterSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        }, 2000)

        setTimeout(() => {
            splashLogo.classList.add('active');
        }, 2500)

        setTimeout(() => {
            intro.style.top = '-100vh';

        }, 3500)
    })
})