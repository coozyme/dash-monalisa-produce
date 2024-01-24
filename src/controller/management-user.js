const { sequelize, Roles, PermissionsRole, Menus } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   GetRoles: async (req, res) => {
      try {
         const roles = await Roles.findAll({
            where: {
               deleted_at: null
            },
         })

         const dataObjects = []
         roles.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               title: data.dataValues.title,
            }
            dataObjects.push(dataObject)
         });

         if (dataObjects.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataObjects))
      } catch (error) {
         console.log('er', error)
      }
   },
   GetDetailPermissionRole: async (req, res) => {
      try {

         const { id } = req.params

         const permissionRole = await PermissionsRole.findAll({
            where: {
               role_id: id
            },
            include: [
               {
                  model: Menus,
                  as: "menu",
                  attributes: ["id", "name", "menu_key"],
               },
               {
                  model: Roles,
                  as: "role",
                  attributes: ["id", "title"],
               },
            ],
         })

         if (permissionRole?.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         console.log('LOG-GetDetailPermissionRole', permissionRole)
         const menuData = []
         const response = {
            roleId: permissionRole[0]?.role?.id,
            roleName: permissionRole[0]?.role?.title,
            menu: menuData
         }

         permissionRole.forEach(data => {
            console.log('LOG-data', data.menu.id, data.menu.name)
            const dataObject = {
               id: data.menu.id,
               menuName: data.menu.name,
            }
            menuData.push(dataObject)
         });



         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", response))
      } catch (error) {
         console.log('er', error)
      }
   },
   AddRole: async (req, res) => {
      try {

         const { roleName, menuId } = req.body
         console.log('LOG-BODY', req.body);
         var payloadRole = {
            title: roleName,
            created_at: TimeZoneIndonesia(),
         }

         role = await Roles.create(payloadRole)

         console.log('LOG-ADD', role)
         menuId.forEach(async (data) => {
            const permissionRole = await PermissionsRole.create({
               role_id: role.id,
               menu_id: data,
               created_at: TimeZoneIndonesia(),
            })

            // permissionRole.
            console.log('LOG-PermissionRole', permissionRole)
         });


         // let dataObject = {
         //    nameMenu: menu.name,
         //    accessMenu: menu.menu_key,
         // };





         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success created", null))

      } catch (error) {
         console.log('er', error)
      }
   },
   PermissionsAccess: async (req, res) => {
      try {
         const { roleId, menuId } = req.body

         // menuId?.forEach(id => {

         // });
         // var payload = {
         //    name: nameMenu,
         //    menu_key: menuKey,
         //    is_publish: isPublish,
         //    created_at: TimeZoneIndonesia(),
         // }

         menu = await Menus.create({
            role_id: roleId,
            menu_id: menuId,
         })
         console.log('LOG-ADD-menu', menu)
         // let dataObject = {
         //    nameMenu: menu.name,
         //    accessMenu: menu.menu_key,
         // };

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success created", null))
      } catch (error) {
         console.log('er', error)
      }
   },
   UpdateRole: async (req, res) => {
      const t = await sequelize.transaction();
      try {
         const { roleName, menuId } = req.body
         const id = req.params.id

         var payload = {
            title: roleName,
            updated_at: TimeZoneIndonesia(),
         }

         role = await Roles.update(payload, {
            where: {
               id: id,
            },
            transaction: t
         })

         if (role[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed update", null))
            return
         }

         await PermissionsRole.destroy({
            where: {
               role_id: id,
            },
            transaction: t
         })
         let menuRole = []
         menuId.forEach(async (data) => {
            const dt = {
               role_id: id,
               menu_id: data,
               created_at: TimeZoneIndonesia(),
            }
            menuRole.push(dt)
         })

         await PermissionsRole.bulkCreate(menuRole, {
            transaction: t
         })
         await t.commit();
         // const permissionRole = await PermissionsRole.destroy({
         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success update", null))
      } catch (error) {
         t.rollback();
         console.log('er', error)
         msg = err.errors?.map(e => e.message)[0]
         if (err.name == "SequelizeUniqueConstraintError") {
            res.set('Content-Type', 'application/json')
            res.status(409).send(Response(false, "409", msg, null))
            return
         }


         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   DeleteRole: async (req, res) => {
      try {
         const { id } = req.params
         const role = await Roles.update({
            deleted_at: TimeZoneIndonesia(),
         }, {
            where: {
               id: id,
            }
         })

         if (role[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed delete", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success delete", null))
      } catch (error) {
         console.log('er', error)
      }
   },
   // forgotPassword: async (req, res) => {
   //    try {
   //       var pic = {
   //          logo: "../assets/img/stisla-fill.svg"
   //       }
   //       res.render('pages/auth/forgot_password.ejs', { pic: pic })
   //       //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
   //    } catch (error) {
   //       console.log('er', error)
   //    }
   // }
}