const path = require("path");
const fs = require("fs");
const { getUrl, isNumber } = require("../../helpers");
const db = require("../../database/models");
const { Op } = require("sequelize");
const { response } = require("express");

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
};
