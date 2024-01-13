
const { Users, Employee, Roles, PermissionsRole, Menus } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia } = require("../utils/times/timezone");
const auth = require("./auth");
const uuid = require('node-uuid');
const { QueryTypes } = require("sequelize");

module.exports = {
   GetDataUser: async (req, res) => {
      try {
         const auth = req.contextAuth
         console.log('auth', auth)
         // const uid = UUID.parse(auth.uid)
         const id = uuid.parse(auth.uid, new Buffer(16))
         // console.log('UID', id)
         // var buffer = Buffer.alloc(16, auth.uid);
         // var interface16 = new Uint16Array(buffer);
         // const dd = `UUID_TO_BIN("${id}")`
         const user = await Users.findOne({
            where: {
               id: id,
               deleted_at: null
            },
         })
         // const user = await Users.findByPk(id)
         // const user = await sequelize.query(`SELECT * FROM users WHERE BIN_TO_UUID(id) = :id`, {
         //    replacements: { id: `${auth.id}` },
         //    type: QueryTypes.SELECT,
         //    model: Users,
         //    mapToModel: true // pass true here if you have any mapped fields
         // });
         console.log('LOG-user', user)

         if (!user) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "User not found", null))
            return
         }

         const empl = await Employee.findOne({
            where: {
               user_id: id,
               deleted_at: null
            },
            include: [
               {
                  model: Roles,
                  as: "role",
                  attributes: {
                     exclude: ["created_at", "updated_at", "deleted_at"]
                  }
               },
            ],
         })

         if (!empl) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Employee not found", null))
            return
         }

         const permissionRole = await PermissionsRole.findAll({
            where: {
               role_id: empl.role_id,
            },
            include: [
               {
                  model: Menus,
                  as: "menu",
                  where: {
                     is_publish: true
                  },
                  attributes: {
                     exclude: ["created_at", "updated_at", "deleted_at"]
                  }
               }
            ]
         })
         const menu = []
         permissionRole.map((item) => {
            const data = {
               id: item.menu.id,
               name: item.menu.name,
               menu_key: item.menu.menu_key,
            }
            menu.push(data)

         })

         const dataResponse = {
            uid: user.uid,
            employeeId: empl.id,
            username: user.username,
            email: user.email,
            fullname: empl.fullname,
            role: {
               id: empl.role_id,
               title: empl.role.title,
            },
            menu: menu,

         }


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data Found", dataResponse))
      } catch (err) {
         console.log('er', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   }
}