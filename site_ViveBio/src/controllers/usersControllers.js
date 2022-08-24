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
    processLogin: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const user = await db.User.findOne({
                    where: {
                        username: req.body.username
                    },
                    include: [
                        { association: 'rol' }
                    ]
                })
                req.session.userLogin = {
                    id: +user.id,
                    firstname: user.firstname.trim(),
                    lastname: user.lastname.trim(),
                    image: user.image,
                    username: user.username.trim(),
                    rol: user.rol.name.trim(),
                    ubication: user.ubication ? user.ubication.trim() : null
                }
                if (req.body.remember) {
                    res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
                }
                return res.redirect('/');
            } catch (error) {
                console.log(error)
            }
        } else {
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const { firstname, lastname, email, username, password } = req.body;
                const newuser = await db.User.create({
                    firstname,
                    lastname,
                    username,
                    email,
                    password: bcryptjs.hashSync(password, 10),
                    rol_id: 2,
                    image: req.file ? req.file.filename : "defaultAvatar.png"
                })
                req.session.userLogin = {
                    id: newuser.id,
                    username: newuser.username,
                    rol: "user",
                    image: newuser.image,
                    ubication: null
                }
                res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
                return res.redirect("/");
            } catch (error) {
                console.log(error)
            }
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
                const oldUser = await db.User.findByPk(req.params.id, {
                    include: ['rol']
                })
                const user = await db.User.update({
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    username: username.trim(),
                    image: req.file ? req.file.filename : oldUser.image
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                const userEdited = await db.User.findByPk(req.params.id, {
                    include: ['rol']
                })
                req.session.userLogin = {
                    id: userEdited.id,
                    username: userEdited.username,
                    image: userEdited.image,
                    rol: userEdited.rol.name
                }
                if (req.file) {
                    if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'users', userEdited.image)) && oldUser.image !== "defaultAvatar.png"
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
    },
    updatePass: async (req, res) => {
        try {
            let { Newpassword } = req.body;
            const user = await db.User.update({
                password: bcryptjs.hashSync(Newpassword, 10)
            }, {
                where: {
                    id: req.params.id
                }
            })
            return res.redirect((`/users/profile/edit/${req.params.id}`))
        } catch (error) {
            console.log(error);
        }

    },
    cropertest: async (req, res) => {
        return res.render('users/croppertest')
    },

    processCropper: async(req,res)=>{
        return res.send(req.file)
    },
    deleteUser: async (req,res) =>{
        return res.send(req.params)
    }
}

