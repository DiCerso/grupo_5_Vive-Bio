console.log('productAdd.js success!');

const form = document.querySelector('form.productAdd')
const name = document.querySelector('#name')
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
    description: /^[a-zA-ZÀ-ÿ\s]{50,100}$/, // Letras y espacios, pueden llevar acentos. Entre 50 y 100.
}

window.addEventListener("load", function(){

    
    name.addEventListener('blur', async (e) => {

        if (expresiones.name.test(e.target.value)){
            name.style.borderColor = 'green'
            errorName.innerHTML = null;
        }
        else {
            errorName.innerHTML = "Ingresa entre 5 y 20 caracteres";
            name.style.borderColor = 'red'
        }

        try {
            let vali = await fetch(`/api/products/findone?keyword=${e.target.value}`,{
                headers : {
                    'Content-Type': 'application/json' 
                }
            })
            let result = await vali.json();
            if(result.data.name){
                console.log("entro")
                name.style.borderColor = 'red'
                errorName.innerHTML = "este producto ya esta creado"
            }
        } catch (error) {
            console.log(error)
        }
    });
    

    volume.addEventListener('blur', function(e){

        if (expresiones.price.test(e.target.value)){
        this.style.borderColor = 'green'
        errorVolume.innerHTML = null;
        } 
        else {
        errorVolume.innerHTML = "Ingrese entre 2 y 5 números";
        this.style.borderColor = 'red'
        }
        
    });

    category.addEventListener('blur', function(e){

        if (e.target.value == ''){
        errorCategory.innerHTML = "Ingrese una categoria";
        category.style.borderColor = 'red'
        }
        category.addEventListener('change', function(e){
            category.style.borderColor = 'green'
            errorCategory.innerHTML = null;
        }) 
    });

    property.addEventListener('blur', function(e){

        if (e.target.value == ''){
        errorproperty.innerHTML = "Ingrese una propiedad";
        property.style.borderColor = 'red'
        }
        property.addEventListener('change', function(e){
            property.style.borderColor = 'green'
            errorproperty.innerHTML = null;
        }) 
    });


    price.addEventListener('blur', function(e){

    if (expresiones.price.test(e.target.value)){
        this.style.borderColor = 'green'
        errorPrice.innerHTML = null;
    } else {
        errorPrice.innerHTML = "Ingrese entre 2 y 5 números";
        this.style.borderColor = 'red'
        }
    });
    

    discount.addEventListener('blur', function(e){

        if (expresiones.discount.test(e.target.value)){
        this.style.borderColor = 'green'
        errorDiscount.innerHTML = null;
        } else {
        errorDiscount.innerHTML = "Ingrese hasta 3 números";
        this.style.borderColor = 'red'
        }
    });


    stock.addEventListener('blur', function(e){

        if (this.value.length > 1 && this.value.length < 10){
        this.style.borderColor = 'green'
        errorStock.innerHTML = null;
        } else {
        errorStock.innerHTML = "Ingresa entre 1 y 10 números";
        this.style.borderColor = 'red'
        }
    });


    ingredients.addEventListener('blur', function(e){

        if (expresiones.ingredients.test(e.target.value)){
        this.style.borderColor = 'green'
        errorIngredients.innerHTML = null;
        } else {
        errorIngredients.innerHTML = "Ingresa entre 5 y 30 caracteres";
        this.style.borderColor = 'red'
        }
    });


    description.addEventListener('blur', function(e){

        if (expresiones.description.test(e.target.value)){
        errorDescription.innerHTML = null;
        } else {
        errorDescription.innerHTML = "Ingresa entre 50 y 100 caracteres";
        this.style.borderColor = 'red'
        }
    });

/* Validación al intentar enviar el formulario */    

    form.addEventListener('submit', function(e){

   errors = []

    if(name.value == ''){
        errors.push('Nombre: '+ msjCampoVacio)
    } else if (name.value.length < 3){
        errors.push('El nombre del producto debe contener como mínimo tres letras')
    }

    if(category.value == ''){
        errors.push('Debe seleccionar una categoría')
    } 

    if(property.value == ''){
        errors.push('Debe seleccionar una propiedad')
    } 

    let volume = document.querySelector('#volume')
    if(volume.value == ''){
        errors.push('Peso: '+ msjCampoVacio)
    } else if (volume.value.length < 2){
        errors.push('El peso debe contener como mínimo dos cifras')
    }

    let price = document.querySelector('#price')
    if(price.value == ''){
        errors.push('Precio: '+ msjCampoVacio)
    } else if (price.value.length < 2){
        errors.push('El precio debe contener como mínimo dos cifras')
    }

    let discount = document.querySelector('#discount')
    if(discount.value == ''){
        errors.push('Descuento: '+ msjCampoVacio)
    }

    let stock = document.querySelector('#stock')
    if(stock.value == ''){
        errors.push('Stock: '+ msjCampoVacio)
    } 

    if(ingredients.value == ''){
        errors.push('Ingredientes: '+ msjCampoVacio)
    } else if (ingredients.value.length < 5){
        errors.push('El campo ingredientes debe contener como mínimo tres letras')
    }

    if(description.value == ''){
        errors.push('Descripción: '+ msjCampoVacio)
    } else if (description.value.length < 10){
        errors.push('La descripción debe contener como mínimo diez letras')
    }

    if (errors.length > 0) {
        e.preventDefault()
        let ulErrors = document.querySelector('div.errors ul')
        for (let error of errors) {
            ulErrors.innerHTML += '<li> - ' + error + '</li>' 
        }
    }
})

    })
    