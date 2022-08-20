const db = require("../../database/models");
const { compareSync } = require("bcryptjs");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { transporter } = require("../../helpers/transporter");
const { getUrl, isNumber } = require("../../helpers");


module.exports = {
  apiLogin: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email
        },
        include: [
          { association: 'rol' }
        ]
      })

      req.session.userLogin = {
        id: user.id,
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        image: user.image,
        username: user.username.trim(),
        rol: user.rol.name.trim()
      }
      if (req.body.remember) {
        res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      }
      let response = {
        ok: true,
        data: user ? true : false,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "E-mail sign error"
      });
    }
  },
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
  },
  sendMail: async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    try {
      let { email, num } = req.body
      // send mail with defined transport object
      let mensaje = await transporter.sendMail({
        from: '<vivebioservices@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Verificacion de mail", // Subject line
        html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
         <tr>
           <td>
                   <h2>Bienvenido a ViveBio</h2>
                   <h5>Tu codigo de Validacion es:</h5>
           </td>
         </tr>
         <tr style="width: 150px;
         height: 60px;
         background: green;
         display: flex;
         align-items: center;
         margin: auto;
         color: white;
         border-radius: 10px;
         border: 1px solid gray;">
           <td style="margin:0 auto;">
               <h1 >${num}</h1>
           </td>
         </tr>
       </table>`, // html body
      });
      let response = {
        ok: true,
        meta: {
          status: 500,
        },
        url: getUrl(req),
        msg: `el mail se envió correctamente a ${email}`
      }
      return res.status(200).json(response);
    } catch (error) {
      let response = {
        ok: false,
        meta: {
          status: 500,
        },
        url: getUrl(req),
        msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
      }
      return res.status(500).json(response);
    }
  },

  /*  loginApi: async (req, res) => {
     
   }, */
  all: async (req, res) => {
    try {
      let users = await db.User.findAll({
        include: [
          { association: 'rol' }
        ]
      });
      let response = {
        ok: true,
        meta: {
          status: 200,
          total: users.length,
        },
        url: getUrl(req),
        data: users
      }
      return res.status(200).json(response);


    } catch (error) {
      let response = {
        ok: false,
        meta: {
          status: 500,
        },
        url: getUrl(req),
        msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
      }
      return res.status(500).json(response);
    }
  },
  remove: async (req, res) => {
    try {
      if (isNumber(req.params.id, req, "id")) {
        return res.status(400).json(isNumber(req.params.id, req, "id"))
      }
      const user = await db.User.findByPk(req.params.id)

      if (!user) {
        let response = {
          ok: false,
          meta: {
            status: 400,
          },
          url: getUrl(req),
          msg: "No se encuentra un usuario con el id ingresado"
        }
        return res.status(400).json(response);
      }

      const destroyuser = await db.User.destroy({
        where: {
          id: req.params.id
        },
        force: true
      })
      if (destroyuser) {
        let response = {
          ok: true,
          meta: {
            status: 200
          }, 
          url: getUrl(req),
          msg: "El usuario se ha eliminado exitosamente"
        }
        return res.status(200).json(response)
      }


    } catch (error) {
      let response = {
        ok: false,
        meta: {
          status: 500,
        },
        url: getUrl(req),
        msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
      }
      return res.status(500).json(response);
    }
  },
  changerol: async (req, res) => {
    try {
      let { rol, id } = req.body;
      if (rol == 1) {
        let user = await db.User.update({
          rol_id: 2
        }, {
          where: {
            id: id
          }
        })

        let response = {
          ok: true,
          meta: {
            status: 200
          },
          url: getUrl(req),
          msg: "El usuario ha sido actualizado exitosamente"
        }
        return res.status(200).json(response)
      } else if (rol == 2) {
        let user = await db.User.update({
          rol_id: 1
        }, {
          where: {
            id: id
          }
        })

        let response = {
          ok: true,
          meta: {
            status: 200
          },
          url: getUrl(req),
          msg: "El usuario ha sido actualizado exitosamente"
        }
        return res.status(200).json(response)
      }
    } catch (error) {
      console.log(error);
    }
  },
  search: async (req, res) => {

    try {
      let users = await db.User.findAll({
        where: {
          [Op.or]: [
            { username: { [Op.substring]: req.query.keyword } },
          ],
        },
        include: ["rol"],
      })

      if (users.length != 0) {
        let response = {
          ok: true,
          meta: {
            status: 200
          },
          url: getUrl(req),
          data: { "user": users }
        }
        return res.status(200).json(response);
      } else {
        let response = {
          ok: false,
          meta: {
            status: 400
          },
          url: getUrl(req),
          msg: "No se encuentra un usuario con esos caracteres"
        }
        return res.status(400).json(response);
      }

    } catch (error) {
      let response = {
        ok: false,
        meta: {
          status: 500,
        },
        url: getUrl(req),
        msg: error.messaje ? error.messaje : "Comuníquese con el administrador"
      }
      return res.status(500).json(response);
    }
  },
  changeubication: async (req, res) => {
    try {
      let { ubication, id } = req.body;
      if (ubication) {
        let user = await db.User.update({
          ubication: ubication
        }, {
          where: {
            id: id
          }
        })

        let response = {
          ok: true,
          meta: {
            status: 200
          },
          url: getUrl(req),
          msg: "El usuario ha sido actualizado exitosamente"
        }
        return res.status(200).json(response)
      } else {
        let user = await db.User.update({
          ubication: null
        }, {
          where: {
            id: id
          }
        })

        let response = {
          ok: true,
          meta: {
            status: 200
          },
          url: getUrl(req),
          msg: "El usuario ha sido actualizado exitosamente"
        }
        return res.status(200).json(response)
      }
    } catch (error) {
      console.log(error);
    }
  },
  addFavorite: async (req, res) => {

  },
  removeFavorite: async (req, res) => {

  }
};
