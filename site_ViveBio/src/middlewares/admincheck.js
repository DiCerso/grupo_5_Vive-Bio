module.exports = (req,res,next) => {
    if(req.session.userLogin && (req.session.userLogin.rol == "admin" || req.session.userLogin.rol == "moderator")){
        next()
    }else{
        res.redirect('/')
    }
}