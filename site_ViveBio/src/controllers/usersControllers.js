const { validationResult } = require("express-validator");
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const path = require("path");
const categoryUsers = require('../data/categoryUsers.json');
const users = require('../data/users.json');

module.exports = {
    login: (req, res) => res.render('users/login'),

    register: (req, res) => res.render('users/register', {
        categoryUsers, old: req.body
    }),

    processRegister: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'data', 'users.json')));
        let errors = validationResult(req);

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
                image: req.file ? req.file.filename : "defaultAvatar.jpg"
            }
            users.push(newUser);
            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), JSON.stringify(users, null, 3), 'utf-8');
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

    }
}
