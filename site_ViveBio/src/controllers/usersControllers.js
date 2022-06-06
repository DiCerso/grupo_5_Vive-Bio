const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const users = require('../data/users.json');

module.exports = {
    login: (req, res) => {
        
        return res.render('users/login')
        
    },

    register: (req, res) => res.render('users/register', {
         old: req.body
    }),
    processLogin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'users.json')));
        let errors = validationResult(req);
        let {password} = req.body;
        let contra = ""
        for(let i = 1; i<= password.length ; i++){
            contra = contra + "*";
        }
        
        if (errors.isEmpty()) {
            //levantar sesión
            const { id, user, category } = users.find(user => user.user === req.body.user);
             


            req.session.userLogin = {
                id,
                user,
                category,
                contra,
            }

            if (req.body.recordar) {
                res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
            }

            return res.redirect('/');
        } else {
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            });
        }
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);
        let {password} = req.body;
        let contra = ""
        for(let i = 1; i<= password.length ; i++){
            contra = contra + "*";
        }
        if (errors.isEmpty()) {
            let { firstName, lastName, email, user, password } = req.body;
            let lastID = users.length !== 0 ? users[users.length - 1].id : 0;
            let newUser = {
                id: lastID + 1,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email,
                user: user.trim(),
                password: bcryptjs.hashSync(password, 10),
                image: req.file ? req.file.filename : "defaultAvatar.jpg",
                category : "user"
            }
            users.push(newUser);
            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), JSON.stringify(users, null, 3), 'utf-8');



            //levanto sesion
            const { id } = newUser

            req.session.userLogin = {
                id,
                user: user.trim(),
                contra, 
            }

            return res.redirect("/");

        } else {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, "..", "public", "images", "users", req.file.filename)
                );
            }
            return res.render('users/register', {
                errores: errors.mapped(),
                old: req.body
            })
        };

    },
    logout: (req, res) => {
        req.session.destroy()
        res.cookie('userViveBio',null,{maxAge : -1})
        return res.redirect('/')
    },
    profile: (req, res) => {
        const {id} = req.params;
        const user = users.find(user => user.id === +id);
        return res.render('users/userprofile', {user})
    }
}













