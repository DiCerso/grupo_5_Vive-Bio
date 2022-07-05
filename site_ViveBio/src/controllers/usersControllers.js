const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const db = require('../database/models');


module.exports = {
    login: (req, res) => {
        return res.render('users/login')
    },

    register: (req, res) => res.render('users/register', {
        old: req.body
    }),
    processLogin: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { username } = req.body;
            db.User.findOne({
                where: {
                    username
                },
                include: [
                    { association: 'rols' }
                ]
            }).then(user => {
                req.session.userLogin = {
                    id: +user.id,
                    firstname: user.firstname.trim(),
                    lastname: user.lastname.trim(),
                    image: user.image,
                    username: user.username.trim(),
                    rol: user.rols.name.trim()
                }
                if (req.body.remember) {
                    res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
                }
                return res.redirect('/');
            })
        } else {
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    processRegister: (req, res) => {
/*         let errors = validationResult(req);
 */        /* if (errors.isEmpty()) { */
            let { firstname, lastname, email, username, password } = req.body;
            const newuser = db.User.create({
                firstname,
                lastname,
                username,
                email,
                password: bcryptjs.hashSync(password, 10),
                rol_id: 2,
                image: req.file ? req.file.filename : "defaultAvatar.jpg"
            })

            Promise.all(([newuser]))
                .then(([newuser]) => {
                    return res.send(newuser)
                    req.session.userLogin = {
                        id: newuser.id,
                        username: newuser.username,
                        rol: "user",
                        image: newuser.image
                    }
                    return res.redirect("/");
                })
                .catch(error => console.log(error))
        /* } else { */
            /* if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, '..', '..', 'public', 'images', 'users', req.file.filename)
                );
            }
            return res.render('users/register', {
                errores: errors.mapped(),
                old: req.body
            }) */
        /* } */
    },
    logout: (req, res) => {
        req.session.destroy()
        res.cookie('userViveBio', null, { maxAge: -1 })
        return res.redirect('/')
    },
    profile: (req, res) => {
        const user = db.User.findByPk(req.session.userLogin.id, {
            include: ['rols']
        })
        Promise.all(([user]))
            .then(([user]) => {
                return res.render('users/userprofile', {
                    user
                })
            })

    },
    editProfile: (req, res) => {
        const user = db.User.findByPk(req.session.userLogin.id, {
            include: ['rols']
        })
        Promise.all(([user]))
            .then(([user]) => {
                return res.render('users/editProfile', {
                    user
                })
            })
    },
    processEditProfile: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'users.json')));
        let errors = validationResult(req);
        let { firstName, lastName, username } = req.body;
        let { id } = req.params;
        let oldUser = users.find(user => +user.id === +id);
        if (errors.isEmpty()) {
            let contra = ""
            for (let i = 1; i <= oldUser.password.length; i++) {
                contra = contra + "*";
            }
            let userEdited = users.map(user => {
                if (+user.id === +id) {
                    let userEdited = {
                        ...user,
                        firstName,
                        lastName,
                        email: oldUser.email,
                        user: username,
                        category: oldUser.category,
                        password: oldUser.password,
                        image: req.file ? req.file.filename : oldUser.image,
                    }
                    req.session.userLogin.image =
                        userEdited.image;

                    if (userEdited.user !== req.session.userLogin.user) {
                        req.session.userLogin.user =
                            userEdited.user
                    }

                    if (req.file) {
                        if (
                            fs.existsSync(
                                path.resolve(__dirname, '..', '..', 'public', 'images', 'users', user.image)
                            ) &&
                            user.image !== "defaultAvatar.jpg"
                        ) {
                            fs.unlinkSync(
                                path.resolve(__dirname, '..', '..', 'public', 'images', 'users', oldUser.image)
                            );
                        }
                    }
                    return userEdited;
                }
                return user;
            });
            fs.writeFileSync(
                path.resolve(__dirname, '..', 'data', 'users.json'),
                JSON.stringify(userEdited, null, 3),
                "utf-8"
            );
            return res.redirect(`/users/profile/${id}`);
        } else {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, "..", "public", "images", "users", req.file.filename)
                );
            }
            const { id } = req.params;
            const user = users.find(user => user.id === +id);
            return res.render('users/editProfile', {
                user,
                errores: errors.mapped(),
                old: req.body
            })
        };
    }

}

