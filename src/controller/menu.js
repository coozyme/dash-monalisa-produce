const { Menus } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   Get: async (req, res) => {
      try {
         const dataMenus = await Menus.findAll()

         const dataObjects = []
         dataMenus.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               menuName: data.dataValues.name,
               menuKey: data.dataValues.menu_key,
               isPublish: data.dataValues.is_publish
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
      } catch (err) {
         console.log('LOG-ERR-Get', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   // Get: async (socket) => {
   //    try {
   //       const dataMenus = await Menus.findAll()

   //       // try {
   //       const dataResponses = []
   //       dataMenus.forEach(data => {
   //          const dataObject = {
   //             id: data.dataValues.id,
   //             name: data.dataValues.name,
   //             keyName: data.dataValues.name_key
   //          }
   //          dataResponses.push(dataObject)
   //       });

   //       // res.set('Content-Type', 'application/json')
   //       socket.on('get_menus', (data) => {
   //          console.log('LOG-GET-MENUS', data)
   //          // socket.broadcast.emit('recive_message', data)
   //       })
   //    } catch (error) {
   //       console.log('LOG-ERR-Get', Error)
   //    }
   // },
   Create: async (req, res) => {
      try {
         const { nameMenu, menuKey, isPublish } = req.body

         var payload = {
            name: nameMenu,
            menu_key: menuKey,
            is_publish: isPublish,
            created_at: TimeZoneIndonesia(),
         }

         menu = await Menus.create(payload)

         let dataObject = {
            nameMenu: menu.name,
            accessMenu: menu.menu_key,
         };

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success created", dataObject))
      } catch (err) {

         console.log('LOG-er', err)
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
   Update: async (req, res) => {
      try {
         const { nameMenu, menuKey, isPublish } = req.body
         const id = req.params.id

         var payload = {
            name: nameMenu,
            menu_key: menuKey,
            is_publish: isPublish,
            updated_at: TimeZoneIndonesia(),
         }

         menu = await Menus.update(payload, {
            where: {
               id: id,
            }
         })

         if (menu[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Data not found", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success updated", null))
      } catch (err) {
         // req.flash('alertMessage', err.Message)
         console.log('LOG-er', err)
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
}