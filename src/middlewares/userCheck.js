module.exports = (req, res, next) => {
    if (req.session.userLogin){
        next()
    }else{
        return res.redirect('/users/login')
    }
}

