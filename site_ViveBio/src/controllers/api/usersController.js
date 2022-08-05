const db = require("../../database/models");
const { compareSync } = require("bcryptjs");
const { Op } = require("sequelize");


module.exports = {
  checkEmail: async (req, res) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      let response = {
        ok: true,
        data: user ? true : false,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "E-mail checked error"
      });
    }
  },
  checkUsername: async (req, res) => {
    try {
      let user = await db.User.findOne({
        where: {
          username: req.body.username,
        },
      });
      let response = {
        ok: true,
        data: user ? true : false,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comuníquese con el administrador del sitio",
      });
    }
  },
  checkPassword: async (req, res) => {
    try {

      let user = await db.User.findByPk(req.session.userLogin.id);
      let result = compareSync(req.body.password, user.dataValues.password);
      let response = {
        ok: true,
        data: result,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comuníquese con el administrador del sitio",
      });
    }
  },
  checkEditUsername: async (req, res) => {
    try {
      let user = await db.User.findOne({
        where: {
          [Op.not]: [{ id: req.session.userLogin.id }],
          username: req.body.username
        },
      });
      let response = {
        ok: true,
        data: user ? true : false,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comuníquese con el administrador del sitio",
      });
    }
  }
};
