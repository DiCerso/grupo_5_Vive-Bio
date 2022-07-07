const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const db = require('../database/models');
const { Op } = require('sequelize')


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
                    { association: 'rol' }
                ]
            }).then(user => {
                req.session.userLogin = {
                    id: +user.id,
                    firstname: user.firstname.trim(),
                    lastname: user.lastname.trim(),
                    image: user.image,
                    username: user.username.trim(),
                    rol: user.rol.name.trim()
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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
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
                    req.session.userLogin = {
                        id: newuser.id,
                        username: newuser.username,
                        rol: "user",
                        image: newuser.image
                    }
                    return res.redirect("/");
                })
                .catch(error => console.log(error))
        } else {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, '..', '..', 'public', 'images', 'users', req.file.filename)
                );
            }
            return res.render('users/register', {
                errores: errors.mapped(),
                old: req.body
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.cookie('userViveBio', null, { maxAge: -1 })
        return res.redirect('/')
    },
    profile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: ['rol']
            })
            return res.render('users/userprofile', {
                user
            })
        } catch (error) {
            console.log(error)
        }
    },
    editProfile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: ['rol']
            })
            return res.render('users/editProfile', {
                user
            })

        } catch (error) {
            console.log(error)
        }
    },
    processEditProfile: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const { firstname, lastname, username } = req.body;
                const oldUser = await db.User.findByPk(req.params.id,{
                    include : ['rol']
                })
                const user = await db.User.update({
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    username: username.trim(),
                    image: req.file ? req.file.filename : oldUser.image
                },{
                    where : {
                        id : req.params.id
                    }
                })
                const userEdited = await db.User.findByPk(req.params.id,{
                    include : ['rol']
                })
                req.session.userLogin = {
                    id: userEdited.id,
                    username: userEdited.username,
                    image: userEdited.image,
                    rol: userEdited.rol.name
                }
                if (req.file) {
                    if (
                        fs.existsSync(
                            path.resolve(__dirname, '..', '..', 'public', 'images', 'users', userEdited.image)
                        ) && userEdited.image !== "defaultAvatar.jpg"
                    ) {
                        fs.unlinkSync(
                            path.resolve(__dirname, '..', '..', 'public', 'images', 'users', oldUser.image)
                        );
                    }
                }
                return res.redirect((`/users/profile/${req.params.id}`))
            } catch (error) {
                console.log(error)
            }
        } else {
            if (req.file) {
                fs.unlinkSync(
                    path.resolve(__dirname, "..", "public", "images", "users", req.file.filename)
                );
            }
            try {
                const user = await db.User.findByPk(req.params.id, {
                    include: ['rol']
                })
                return res.render('users/editProfile', {
                    user,
                    errores: errors.mapped(),
                    old: req.body
                })
            } catch (error) {
                console.log(error)
            }


        }
    }
}

