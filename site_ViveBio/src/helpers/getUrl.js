const {request} = require('express');

const getUrl = (request) => {
    return request.protocol + "://" + request.get('host') + request.originalUrl;
    //     http                      localhost:3001         ruta
}


module.exports = {
    getUrl
}