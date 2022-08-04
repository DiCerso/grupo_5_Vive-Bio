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

const expresiones = {
    productName: /^[a-zA-ZÀ-ÿ\s]{5,20}$/, // Letras y espacios, pueden llevar acentos. Entre 5 y 20.
    price: /^\d{2,5}$/, // 2 a 5 números.
    discount: /^\d{1,3}$/, //1 a 3 números.
    stock: /^\d{1,5}$/, // 1 a 5 números.
    images: /(.jpg|.jpeg|.png)$/,
    ingredients: /^[a-zA-ZÀ-ÿ\s]{10,40}$/, // Letras y espacios, pueden llevar acentos. Entre 10 y 40.
    description: /^[a-zA-ZÀ-ÿ\s]{20,200}$/, // Letras y espacios, pueden llevar acentos. Entre 20 y 200.
}
let apiName = async (nombre) => {
    try {
        let vali = await fetch(`/api/products/findone?keyword=${nombre}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let result = await vali.json();
        if (result.data.name) {
            name.style.borderColor = 'red'
            errorName.innerHTML = "este producto ya esta creado"
        }
    } catch (error) {
        console.log(error)
    }
}
let ValidatorName = function (event, vari, errorvari) {

    if (expresiones.name.test(event.target.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    }
    else {
        errorvari.innerHTML = "Ingresa entre 5 y 20 caracteres";
        vari.style.borderColor = 'red'
    }
}


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
            if (expresiones.productName.test(e.target.value)) {
                productName.classList.remove("errorActive")
                productName.classList.add("errorInactive")
                errorName.innerHTML = null;
                errors = false
            }
            else {
                errorName.innerHTML = "Ingrese letras y espacios, acentos. Entre 5 y 20 caracteres.";
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
                errorVolume.innerHTML = "Ingrese entre 2 y 5 números";
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
                errorPrice.innerHTML = "Ingrese entre 2 y 5 números";
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
                errorDiscount.innerHTML = "Ingrese hasta 3 números";
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
                errorStock.innerHTML = "Ingrese entre 1 y 5 números";
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
                errorIngredients.innerHTML = "Ingrese letras y espacios, acentos. Entre 10 y 40 caracteres.";
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
                errorDescription.innerHTML = "Ingrese letras y espacios, acentos. Entre 20 y 200 caracteres.";
                description.classList.remove("errorInactive")
                description.classList.add("errorActive")
                errors = true
            }
            break;
    }
}

forms.forEach((form) => {
    form.addEventListener('keyup', validarFormulario);
    form.addEventListener('blur', validarFormulario);
});



/*Image validation*/
images.addEventListener('change',
    function fileValidation() {
        var fileInput = document.getElementById('images');
        var filePath = fileInput.value;
        if (!expresiones.images.exec(filePath)) {
            errorImages.innerHTML = "Sube archivo con extensiones válidas: .jpeg/.jpg/.png";
            fileInput.value = '';
            return false;
            errors = true
        } else {
            /*Image preview*/
            if (fileInput.files && fileInput.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result + '"/>';
                };
                reader.readAsDataURL(fileInput.files[0]);
                errors = false
            }



            /* Validación al intentar enviar el formulario */
            formulario.addEventListener('submit', function (e) {

                if (errors == true) {
                    e.preventDefault()
                    for (form of forms) {
                        if (form.classList.contains('errorActive')) {

                            errors = true;
                        }
                    } alert('Por favor, revisa los campos, no pueden quedar vacíos.')
                } else {
                    alert("Producto agregado con éxito!");
                    formulario.submit();
                }
            })

        }
    }
)

