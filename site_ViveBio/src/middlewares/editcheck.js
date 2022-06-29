module.exports = (req, res, next) => {
    if (req.session.userLogin && req.session.userLogin.id === +req.params.id){
        next()
    }else{
        return res.redirect('/users/login')
    }
}
