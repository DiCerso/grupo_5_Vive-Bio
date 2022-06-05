module.exports = (req,res,next) => {
    if(req.cookies.userViveBio){
        req.session.userLogin = req.cookies.userViveBio
    }
    next()
}