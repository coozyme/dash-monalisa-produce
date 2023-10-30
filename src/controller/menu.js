// const { Model, Sequelize } = require("sequelize")
// const sequelize = new Sequelize();
// const { Sequelize, sequelize } = require("../config/databases/db")
const menus = require("../models/menus");
const { Role } = require("../models/role");

module.exports = {
   get: async (req, res) => {
      try {

      } catch (error) {

      }
   },
   addMenu: async (req, res) => {
      // var sp = new models
      try {
         console.log("moodel", Role)
         // console.log("menuModel", sequelize.models)
         console.log("res-bodyy", req.body)
         var asd = await Role.create(req.body).then((role) => {
            console.log("LOG-AAD", role)
         })
         console.log('LOG-', asd)
         // res.render('pages/product/products_list.ejs')
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         // req.flash('alertMessage', error.Message)
         console.log('LOG-er', error)
      }
   }
}