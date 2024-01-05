const { Roles, PermissionsRole, Menus } = require("../models");
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
                  attributes: ["id", "name"],
               },
            ],
         })
         // const roles = await Roles.findAll({
         //    where: {
         //       deleted_at: null
         //    },
         // })

         console.log('LOG-GetDetailPermissionRole', permissionRole)
         const dataObjects = []
         permissionRole.forEach(data => {
            console.log('LOG-data', data.menu.id, data.menu.name)
            const dataObject = {
               id: data.menu.id,
               menuName: data.menu.name,
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