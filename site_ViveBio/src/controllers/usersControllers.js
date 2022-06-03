const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const users = require('../data/users.json');

module.exports = {
    login: (req,res) => {
        return res.render('users/login');
    },
    processLogin: (req,res) => {  
        let errors = validationResult(req);
        if(errors.isEmpty()) {
    //levantar sesión
            const {id,user} = users.find(user => user.user === req.body.user);

            req.session.userLogin = {
                id,
                user
            }

            if(req.body.recordar){
                res.cookie('userViveBio',req.session.userLogin,{maxAge: 1000*60*2})
            }
            

          return res.redirect('/');
        }else{
          return res.render('users/login',{
               errors : errors.mapped(),
               old : req.body
            });
        }
    },
    register: (req,res) => res.render('users/register'),
    processRegister: (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const users = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','users.json')));
            let {firstName, lastName, user, email, password} = req.body;
            const lastId = users.length !== 0 ? users[users.length - 1].id : 0;
            let newUser = {
                id: (+lastId + 1),
                firstName : firstName.trim(),
                lastName : lastName.trim(),
                user : user.trim(),
                email,
                password : bcryptjs.hashSync(password, 10)
            }
            users.push(newUser);

            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), 
            JSON.stringify(users, null, 3), 'utf-8');
        
        //levantar sesión
            const {id} = newUser
            
            req.session.userLogin = {
                id,
                user : user.trim(),
            }

            return res.redirect('/');

        }else{
            return res.render('users/register',{
                old : req.body,
                errors : errors.mapped()
            });
        }

    },
    logout : (req,res) => {
        req.session.destroy()
        return res.redirect('/')
    }
}
