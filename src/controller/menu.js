// const { Model, Sequelize } = require("sequelize")
// const sequelize = new Sequelize();
// const { Sequelize, sequelize } = require("../config/databases/db")
// const menus = require("../models/menus");
const { Menus, MenusDTO } = require("../models");
const { ResponseSuccess } = require("../utils/response/success");

module.exports = {
   // Get: async (req, res) => {
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

   //       res.set('Content-Type', 'application/json')
   //    } catch (error) {
   //       console.log('LOG-ERR-Get', Error)
   //    }
   // },
   Get: async (socket) => {
      try {
         const dataMenus = await Menus.findAll()

         // try {
         const dataResponses = []
         dataMenus.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               name: data.dataValues.name,
               keyName: data.dataValues.name_key
            }
            dataResponses.push(dataObject)
         });

         // res.set('Content-Type', 'application/json')
         socket.on('get_menus', (data) => {
            console.log('LOG-GET-MENUS', data)
            // socket.broadcast.emit('recive_message', data)
         })
      } catch (error) {
         console.log('LOG-ERR-Get', Error)
      }
   },
   Create: async (req, res) => {
      // var sp = new models
      try {
         const { nameMenu, accessMenu } = req.body
         // console.log("moodel-role", db)
         // console.log("menuModel", sequelize.models)
         console.log("res-bodyy", req.body)
         // var asd = await Role.create(req.body).then((role) => {
         //    console.log("LOG-AAD", role)
         // })
         var payload = {
            name: nameMenu,
            name_key: accessMenu
         }

         // var pic = {
         //    logo: "../assets/img/stisla-fill.svg"
         // }
         let dataMenu = {
            nameMenu: "",
            accessMenu: ""
         };

         Menus.create(payload)
         // console.log('LOG-', log)
         res.render('pages/management-user/role.ejs', { dataMenu: dataMenu })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         // req.flash('alertMessage', error.Message)
         console.log('LOG-er', error)
      }
   }
}