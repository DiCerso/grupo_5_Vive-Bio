console.log('productEdit.js success!');

let error = 0;
const form = document.querySelector('form.productEdit')
const nombre = document.querySelector('#name')
const volume = document.querySelector('#volume')
const price = document.querySelector('#price')
const discount = document.querySelector('#discount')
const stock = document.querySelector('#stock')
const ingredients = document.querySelector('#ingredients')
const description = document.querySelector('#description')
const property = document.querySelector('#property')
const errorName = document.querySelector('p.errorName')
const errorCategory = document.querySelector('.errorCategory')
const errorVolume = document.querySelector('p.errorVolume')
const errorPrice = document.querySelector('p.errorPrice')
const errorDiscount = document.querySelector('p.errorDiscount')
const errorStock = document.querySelector('p.errorStock')
const errorproperty = document.querySelector('.errorBlur')
const errorIngredients = document.querySelector('p.errorIngredients')
const errorDescription = document.querySelector('p.errorDescription')
const msjCampoVacio = "El campo no puede quedar vacío."
const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{5,20}$/, // Letras y espacios, pueden llevar acentos. Entre 5 y 20.
    price: /^\d{2,5}$/, // 2 a 5 números.
    discount: /^\d{1,3}$/,// 1 a 3 números.
    ingredients: /^[a-zA-ZÀ-ÿ\s]{10,40}$/, // Letras y espacios, pueden llevar acentos. Entre 10 y 40.
    description: /^[a-zA-ZÀ-ÿ\s]{50,300}$/, // Letras y espacios, pueden llevar acentos. Entre 50 y 100.
}


let response = async (value) => {
    try {
        let vali = await fetch(`/api/products/findone?keyword=${value}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let result = await vali.json();
        return result.data.name ? result.data.name : null;
    } catch (error) {
        console.log(error)
    }
}

let apiName = async (nombre, produc) => {
    try {
        let result = await response(nombre.value)
        if ( result && result != produc){
            nombre.style.borderColor = 'red'
            errorName.innerHTML = "este producto ya esta creado"
        }
    } catch (error) {
        console.log(error)
    }
}
let ValidatorName = function ( vari, errorvari) {

    if (expresiones.name.test(nombre.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    }
    else {
        errorvari.innerHTML = "Ingresa entre 5 y 20 caracteres";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorVolume = function (vari, errorvari) {

    if (expresiones.price.test(vari.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    }
    else {
        errorvari.innerHTML = "Ingrese entre 2 y 5 números";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorPrice = function ( vari, errorvari) {
    if (expresiones.price.test(vari.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    } else {
        errorvari.innerHTML = "Ingrese entre 2 y 5 números";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorDiscount = function ( vari, errorvari) {
    if (expresiones.discount.test(vari.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    } else {
        errorvari.innerHTML = "Ingrese hasta 3 números";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorStock = function ( vari, errorvari) {
    if (vari.value.length >= 1 && vari.value.length < 10) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    } else {
        errorvari.innerHTML = "Ingresa entre 1 y 10 números";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorIngredients = function (vari, errorvari) {
    if (expresiones.ingredients.test(vari.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    } else {
        errorvari.innerHTML = "Ingresa entre 5 y 30 caracteres";
        vari.style.borderColor = 'red'
        return -1;
    }
}
let ValidatorDescription = function ( vari, errorvari) {
    if (expresiones.description.test(vari.value)) {
        vari.style.borderColor = 'green'
        errorvari.innerHTML = null;
    } else {
        errorvari.innerHTML = "Ingresa entre 50 y 300 caracteres";
        description.style.borderColor = 'red'
        return -1;
    }
}


window.addEventListener("load", async function () {
    let producto
    try {
        producto = await response(nombre.value);
        console.log(producto)
    } catch (error) {
        console.log(error)
    }
    

    nombre.addEventListener('blur', async (e) => {

        ValidatorName(nombre, errorName);
        
        apiName(nombre, producto);

    });


    volume.addEventListener('blur', function (e) {

        ValidatorVolume( volume, errorVolume)

    });


    price.addEventListener('blur', function (e) {

        ValidatorPrice( price, errorPrice)
    });


    discount.addEventListener('blur', function (e) {

        ValidatorDiscount( discount, errorDiscount)
    });


    stock.addEventListener('blur', function (e) {

        ValidatorStock(stock, errorStock)
    });


    ingredients.addEventListener('blur', function (e) {

        ValidatorIngredients( ingredients, errorIngredients)
    });


    description.addEventListener('blur', function (e) {

        ValidatorDescription( description, errorDescription)
    });

    /* Validación al intentar enviar el formulario */

    form.addEventListener('submit', function (e) {
        error = 0;

        if(ValidatorName(nombre, errorName) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorVolume(volume, errorVolume) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorPrice(price, errorPrice) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorDiscount(discount, errorDiscount) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorStock(stock, errorStock) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorIngredients(ingredients, errorIngredients) == -1){
            error++;
            console.log("entro")
        }
        if(ValidatorDescription(description, errorDescription) == -1){
            error++;
            console.log("entro")
        }
        console.log(error)

        if(error != 0){
            e.preventDefault()
        }


        

        /* if (name.value == '') {
            errors.push('Nombre: ' + msjCampoVacio)
        } else if (name.value.length < 3) {
            errors.push('El nombre del producto debe contener como mínimo tres letras')
        }

        if (category.value == '') {
            errors.push('Debe seleccionar una categoría')
        }

        if (property.value == '') {
            errors.push('Debe seleccionar una propiedad')
        }

        let volume = document.querySelector('#volume')
        if (volume.value == '') {
            errors.push('Peso: ' + msjCampoVacio)
        } else if (volume.value.length < 2) {
            errors.push('El peso debe contener como mínimo dos cifras')
        }

        let price = document.querySelector('#price')
        if (price.value == '') {
            errors.push('Precio: ' + msjCampoVacio)
        } else if (price.value.length < 2) {
            errors.push('El precio debe contener como mínimo dos cifras')
        }

        let discount = document.querySelector('#discount')
        if (discount.value == '') {
            errors.push('Descuento: ' + msjCampoVacio)
        }

        let stock = document.querySelector('#stock')
        if (stock.value == '') {
            errors.push('Stock: ' + msjCampoVacio)
        }

        if (ingredients.value == '') {
            errors.push('Ingredientes: ' + msjCampoVacio)
        } else if (ingredients.value.length < 5) {
            errors.push('El campo ingredientes debe contener como mínimo tres letras')
        }

        if (description.value == '') {
            errors.push('Descripción: ' + msjCampoVacio)
        } else if (description.value.length < 10) {
            errors.push('La descripción debe contener como mínimo 50 caracteres')
        }

        if (errors.length > 0) {
            e.preventDefault()
            let ulErrors = document.querySelector('div.errors ul')
            for (let error of errors) {
                ulErrors.innerHTML += '<li> - ' + error + '</li>'
            }
        } */
    })

})
