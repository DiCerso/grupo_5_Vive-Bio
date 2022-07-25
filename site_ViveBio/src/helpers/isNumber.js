const {getUrl} = require('./getUrl');


const isNumber = (id, request, variable) => {
    if(isNaN(id) || id < 0){
        let response = {
            ok : false,
            meta: {
                status : 400
            },
            msg : `el tipo de dato ingresado en ${variable} no es valido`,
            url : getUrl(request)
        }
        return response;
    }else{
        return false;
    }

}


module.exports = {
    isNumber
}