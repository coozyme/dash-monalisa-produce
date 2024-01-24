const UUID = require('uuid');
const { EncryptPassword } = require("../utils/encrypt/encrypt");

const { sequelize, Employee, Users, Roles } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   Add: async (req, res) => {
      const t = await sequelize.transaction();
      try {
         const { fullname, username, password, roleId } = req.body

         passwordHash = await EncryptPassword(password)
         const uuid = UUID.v4()
         const uid = UUID.parse(uuid)
         const user = await Users.create({
            id: uid,
            username: username,
            password: passwordHash,
            created_at: TimeZoneIndonesia(),
         }, {
            transaction: t
         })


         const employee = await Employee.create({
            fullname: fullname,
            is_active: true,
            user_id: uid,
            role_id: parseInt(roleId),
            created_at: TimeZoneIndonesia(),
         }, {
            transaction: t
         })

         await t.commit();

         dataObject = {
            id: employee.id,
            fullname: employee.fullname,
            username: user.username,
            roleId: employee.role_id,
         }

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success Created", dataObject))
      } catch (err) {
         t.rollback();
         console.log('LOG-ERR-Add', err)

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
   Get: async (req, res) => {
      try {
         const employee = await Employee.findAll({
            where: {
               deleted_at: null,
            },
            include: [
               {
                  model: Users,
                  as: "user",
                  attributes: ["username",],
               },
               {
                  model: Roles,
                  as: "role",
                  attributes: ["title"],

               }
            ],
         })
         console.log('LOG-Get', employee)

         const dataObjects = []
         employee.forEach(data => {
            dataObject = {
               id: data.id,
               fullname: data.fullname,
               username: data.user.username,
               role: data.role.title,
               roleId: data.role_id,
               isActive: data.is_active,
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
   Update: async (req, res) => {
      const t = await sequelize.transaction();
      try {
         const { fullname, username, roleId, isActive } = req.body
         const id = parseInt(req.params?.id)
         console.log('LOG-UPDATE-ID', id)

         const dataEmployee = await Employee.findOne({ where: { id: id, deleted_at: null } })
         // console.log('LOG-dataEmployee', dataEmployee)
         if (!dataEmployee) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Data not found", null))
            return
         }

         const employee = await Employee.update({
            fullname: fullname,
            is_active: isActive,
            role_id: parseInt(roleId),
            updated_at: TimeZoneIndonesia(),
         }, {
            where: {
               id: id,
            },
            transaction: t
         })
         // console.log('LOG-user_id', dataEmployee.dataValues.user_id)
         // const uidUser = uuid.parse(dataEmployee.dataValues.user_id, new Buffer(16))
         // console.log('LOG-uidUser', uidUser)
         const user = await Users.update({
            username: username,
            updated_at: TimeZoneIndonesia(),
         }, {
            where: {
               id: dataEmployee.dataValues.user_id,
            },
            transaction: t
         })

         // await Employee.findOne({ where: { id: id, deleted_at: null } })
         //    .on('success', function (employee) {
         //       // Check if record exists in db
         //       if (employee) {
         //          project.update({
         //             fullname: fullname,
         //             is_active: isActive,
         //             role_id: parseInt(roleId),
         //             updated_at: TimeZoneIndonesia(),
         //          }).success(function () {
         //             console.log('LOG-UPDATE', employee)
         //             Users.update({
         //                username: username,
         //                updated_at: TimeZoneIndonesia(),
         //             }, {
         //                where: {
         //                   id: employee.user_id,
         //                },
         //                // transaction: t
         //             })
         //          })
         //       }
         //    })

         // console.log('LOG-UPDATE', user)



         await t.commit();


         // dataObject = {
         //    id: employee.id,
         //    fullname: employee.fullname,
         //    username: user.username,
         //    roleId: employee.role_id,
         // }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success Updated", null))
      } catch (err) {
         t.rollback();
         console.log('LOG-ERR-Get', err)

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