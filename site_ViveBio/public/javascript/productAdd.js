console.log('productAdd.js success!');

const formulario = document.querySelector('form.productAdd')
const forms = document.querySelectorAll('form.productAdd')
const productName = document.querySelector('#name')
const volume = document.querySelector('#volume')
const price = document.querySelector('#price')
const discount = document.querySelector('#discount')
const stock = document.querySelector('#stock')
const ingredients = document.querySelector('#ingredients')
const description = document.querySelector('#description')
const impImage1 = document.querySelector('#image1')
const impImage2 = document.querySelector('#image2')
const impImage3 = document.querySelector('#image3')
let errorImages = document.querySelector('#errorImage')

const expresiones = {
    productName: /^[a-zA-ZÀ-ÿ\s]{5,20}$/, // Letras y espacios, pueden llevar acentos. Entre 5 y 20.
    price: /^\d{2,5}$/, // 2 a 5 números.
    discount: /^\d{1,2}$/, //1 a 2 números.
    stock: /^\d{1,5}$/, // 1 a 5 números.
    images: /(.jpg|.jpeg|.png)$/,
    ingredients: /^[a-zA-ZÀ-ÿ\s]{10,40}$/, // Letras y espacios, pueden llevar acentos. Entre 10 y 40.
    description: /^[a-zA-ZÀ-ÿ\s]{20,200}$/, // Letras y espacios, pueden llevar acentos. Entre 20 y 200.
}

window.addEventListener("load", function () {

    let validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                if (expresiones.productName.test(e.target.value)) {
                    productName.classList.remove("errorActive")
                    productName.classList.add("errorInactive")
                    errorName.innerHTML = null;
                    errors = false
                }
                else {
                    errorName.innerHTML = " Entre 5 y 20 letras, espacios y acentos.";
                    productName.classList.remove("errorInactive")
                    productName.classList.add("errorActive")
                    errors = true
                }
                break;
            case "volume":
                if (expresiones.price.test(e.target.value)) {
                    volume.classList.remove("errorActive")
                    volume.classList.add("errorInactive")
                    errorVolume.innerHTML = null;
                    errors = false
                }
                else {
                    errorVolume.innerHTML = "Entre 2 y 5 números";
                    volume.classList.remove("errorInactive")
                    volume.classList.add("errorActive")
                    errors = true
                }
                break;
            case "price":
                if (expresiones.price.test(e.target.value)) {
                    price.classList.remove("errorActive")
                    price.classList.add("errorInactive")
                    errorPrice.innerHTML = null;
                    errors = false
                } else {
                    errorPrice.innerHTML = "Entre 2 y 5 números";
                    price.classList.remove("errorInactive")
                    price.classList.add("errorActive")
                    errors = true
                }
                break;
            case "discount":
                if (expresiones.discount.test(e.target.value)) {
                    discount.classList.remove("errorActive")
                    discount.classList.add("errorInactive")
                    errorDiscount.innerHTML = null;
                    errors = false
                } else {
                    errorDiscount.innerHTML = "Hasta 2 números";
                    discount.classList.remove("errorInactive")
                    discount.classList.add("errorActive")
                    errors = true
                }
                break;
            case "stock":
                if (expresiones.price.test(e.target.value)) {
                    stock.classList.remove("errorActive")
                    stock.classList.add("errorInactive")
                    errorStock.innerHTML = null;
                    errors = false
                } else {
                    errorStock.innerHTML = "Entre 1 y 5 números";
                    stock.classList.remove("errorInactive")
                    stock.classList.add("errorActive")
                    errors = true
                }
                break;
            case "ingredients":
                if (expresiones.ingredients.test(e.target.value)) {
                    ingredients.classList.remove("errorActive")
                    ingredients.classList.add("errorInactive")
                    errorIngredients.innerHTML = null;
                    errors = false
                } else {
                    errorIngredients.innerHTML = "Entre 10 y 40 letras, espacios y acentos.";
                    ingredients.classList.remove("errorInactive")
                    ingredients.classList.add("errorActive")
                    errors = true
                }
                break;
            case "description":
                if (expresiones.description.test(e.target.value)) {
                    description.classList.remove("errorActive")
                    description.classList.add("errorInactive")
                    errorDescription.innerHTML = null;
                    errors = false
                } else {
                    errorDescription.innerHTML = "Entre 20 y 200 letras, espacios y acentos.";
                    description.classList.remove("errorInactive")
                    description.classList.add("errorActive")
                    errors = true
                }
                break;
        }
    }
    let formFinal = (nombre, value) => {
        switch (nombre) {
            case "name":
                if (expresiones.productName.test(value)) {
                    productName.classList.remove("errorActive")
                    productName.classList.add("errorInactive")
                    errorName.innerHTML = null;
                    errors = false
                }
                else {
                    errorName.innerHTML = " Entre 5 y 20 letras, espacios y acentos.";
                    productName.classList.remove("errorInactive")
                    productName.classList.add("errorActive")
                    errors = true
                }
                break;
            case "volume":
                if (expresiones.price.test(value)) {
                    volume.classList.remove("errorActive")
                    volume.classList.add("errorInactive")
                    errorVolume.innerHTML = null;
                    errors = false
                }
                else {
                    errorVolume.innerHTML = "Entre 2 y 5 números";
                    volume.classList.remove("errorInactive")
                    volume.classList.add("errorActive")
                    errors = true
                }
                break;
            case "price":
                if (expresiones.price.test(value)) {
                    price.classList.remove("errorActive")
                    price.classList.add("errorInactive")
                    errorPrice.innerHTML = null;
                    errors = false
                } else {
                    errorPrice.innerHTML = "Entre 2 y 5 números";
                    price.classList.remove("errorInactive")
                    price.classList.add("errorActive")
                    errors = true
                }
                break;
            case "discount":
                if (expresiones.discount.test(value)) {
                    discount.classList.remove("errorActive")
                    discount.classList.add("errorInactive")
                    errorDiscount.innerHTML = null;
                    errors = false
                } else {
                    errorDiscount.innerHTML = "Hasta 2 números";
                    discount.classList.remove("errorInactive")
                    discount.classList.add("errorActive")
                    errors = true
                }
                break;
            case "stock":
                if (expresiones.price.test(value)) {
                    stock.classList.remove("errorActive")
                    stock.classList.add("errorInactive")
                    errorStock.innerHTML = null;
                    errors = false
                } else {
                    errorStock.innerHTML = "Entre 1 y 5 números";
                    stock.classList.remove("errorInactive")
                    stock.classList.add("errorActive")
                    errors = true
                }
                break;
            case "ingredients":
                if (expresiones.ingredients.test(value)) {
                    ingredients.classList.remove("errorActive")
                    ingredients.classList.add("errorInactive")
                    errorIngredients.innerHTML = null;
                    errors = false
                } else {
                    errorIngredients.innerHTML = "Entre 10 y 40 letras, espacios y acentos.";
                    ingredients.classList.remove("errorInactive")
                    ingredients.classList.add("errorActive")
                    errors = true
                }
                break;
            case "description":
                if (expresiones.description.test(value)) {
                    description.classList.remove("errorActive")
                    description.classList.add("errorInactive")
                    errorDescription.innerHTML = null;
                    errors = false
                } else {
                    errorDescription.innerHTML = "Entre 20 y 200 letras, espacios y acentos.";
                    description.classList.remove("errorInactive")
                    description.classList.add("errorActive")
                    errors = true
                }
                break;
        }
    }

    forms.forEach((form) => {
        form.addEventListener('blur', validarFormulario);
        form.addEventListener('keyup', validarFormulario);
    });


    /*Image validation*/
    impImage1.addEventListener('change',
        function fileValidation() {
            var fileInput = document.getElementById('image1');
            var filePath = fileInput.value;
            if (!expresiones.images.exec(filePath)) {
                /* errorImages.innerHTML = "Subir archivo con extensiones válidas: .jpeg/.jpg/.png"; */
                fileInput.value = '';
                errors = true
                return false;
            } else {
                const element = URL.createObjectURL(fileInput.files[0]);
                const imagen = document.createElement("img");
                imagen.setAttribute('class', "preview_image_product");
                imagen.src = element;
                document.querySelector('#imagePreview1').appendChild(imagen);
                document.querySelector('#clear_preview_1').classList.add('active')
                document.querySelector('.plus_add_product_1').classList.add('disable')
            }
        })

    impImage2.addEventListener('change',
        function fileValidation() {
            var fileInput = document.getElementById('image2');
            var filePath = fileInput.value;
            if (!expresiones.images.exec(filePath)) {
                /* errorImages.innerHTML = "Subir archivo con extensiones válidas: .jpeg/.jpg/.png"; */
                fileInput.value = '';
                errors = true
                return false;
            } else {
                const element = URL.createObjectURL(fileInput.files[0]);
                const imagen = document.createElement("img");
                imagen.setAttribute('class', "preview_image_product");
                imagen.src = element;
                document.querySelector('#imagePreview2').appendChild(imagen);
                document.querySelector('#clear_preview_2').classList.add('active')
                document.querySelector('.plus_add_product_2').classList.add('disable')
            }
        })

    impImage3.addEventListener('change',
        function fileValidation() {
            var fileInput = document.getElementById('image3');
            var filePath = fileInput.value;
            if (!expresiones.images.exec(filePath)) {
                /* errorImages.innerHTML = "Subir archivo con extensiones válidas: .jpeg/.jpg/.png"; */
                fileInput.value = '';
                errors = true
                return false;
            } else {
                const element = URL.createObjectURL(fileInput.files[0]);
                const imagen = document.createElement("img");
                imagen.setAttribute('class', "preview_image_product");
                imagen.src = element;
                document.querySelector('#imagePreview3').appendChild(imagen);
                document.querySelector('#clear_preview_3').classList.add('active')
                document.querySelector('.plus_add_product_3').classList.add('disable')
            }
        })

    document.querySelector('#clear_preview_1').addEventListener('click', () => {
        document.querySelector('#clear_preview_1').classList.remove('active')
        document.querySelector('.plus_add_product_1').classList.remove('disable')
        document.getElementById('imagePreview1').innerHTML = null;
        document.querySelector('#clear_preview_1').value = "";
    })
    document.querySelector('#clear_preview_2').addEventListener('click', () => {
        document.querySelector('#clear_preview_2').classList.remove('active')
        document.querySelector('.plus_add_product_2').classList.remove('disable')
        document.getElementById('imagePreview2').innerHTML = null;
        document.querySelector('#clear_preview_2').value = "";
    })
    document.querySelector('#clear_preview_3').addEventListener('click', () => {
        document.querySelector('#clear_preview_3').classList.remove('active')
        document.querySelector('.plus_add_product_3').classList.remove('disable')
        document.getElementById('imagePreview3').innerHTML = null;
        document.querySelector('#clear_preview_3').value = "";
    })


    /* Validation submit */
    formulario.addEventListener('submit', function (e) {
        let errors = false;
        e.preventDefault()
        for (let i = 0; i <= 9; i++) {
            formFinal(forms[0][i].id, forms[0][i].value)
            if (forms[0][i].classList.contains('errorActive') || errors == true) {
                errors = true;
            }
        }
        if (errors == true) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, revisa los campos agregados',
            })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado con éxito',
                showConfirmButton: false,
                timer: 3000,
                setTimeout: 2000,
            })
            formulario.submit();
        }
    })
})