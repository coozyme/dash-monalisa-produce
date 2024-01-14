const { Machines, Employee } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   Add: async (req, res) => {
      console.log('LOG-BODY', req.body);
      try {
         dataObject = {
            name: req.body.name,
            kode: req.body.kode,
            pic_id: req.body.picId,
            average_produce: req.body.averageProduce,
            status: req.body.status,
            created_at: TimeZoneIndonesia(),
         }
         const machine = await Machines.create(dataObject)

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success created", machine.dataValues))
      } catch (err) {
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
      console.log('LOG-BODY', req.body);
      try {
         dataObjects = []

         const machine = await Machines.findAll({
            where: {
               deleted_at: null,
            },
            include: [
               {
                  model: Employee,
                  as: "employee",
                  attributes: ["id", "fullname"],
               },
            ],
         })

         machine.forEach(data => {
            console.log('LOG-GET', data)
            dataMachine = data.dataValue
            dataObject = {
               id: data.id,
               name: data.name,
               kode: data.kode,
               picId: data.employee.id,
               picName: data.employee.fullname,
               averageProduce: data.average_produce,
               status: data.status,
            }
            dataObjects.push(dataObject)
         });

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataObjects))
      } catch (err) {
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
   GetByID: async (req, res) => {
      id = parseInt(req.params.id)

      try {
         dataObjects = []

         const machine = await Machines.findAll({
            where: {
               id: id,
               deleted_at: null,
            },
            include: [
               {
                  model: Employee,
                  as: "employee",
                  attributes: ["id", "fullname"],
               },
            ],
            limit: 1
         })
         console.log('LOG-GetByID', machine);
         if (machine.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Data not found", null))
            return
         }

         machine.forEach(data => {
            console.log('LOG-GET', data)
            dataMachine = data.dataValue
            dataObject = {
               id: data.id,
               name: data.name,
               kode: data.kode,
               picId: data.employee.id,
               picName: data.employee.name,
               averageProduce: data.average_produce,
               status: data.status,
            }
            dataObjects.push(dataObject)
         });

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataObjects[0]))
      } catch (err) {
         console.log('LOG-ERR-GetByID', err)
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
   UpdateByID: async (req, res) => {
      id = parseInt(req.params.id)

      try {
         console.log('LOG-Params.id', id);
         dataObject = {
            name: req.body.name,
            kode: req.body.kode,
            pic_id: req.body.picId,
            average_produce: req.body.averageProduce,
            status: req.body.status,
            updated_at: TimeZoneIndonesia(),
         }

         const machine = await Machines.update(dataObject, {
            where: {
               id: id,
               deleted_at: null,
            }
         })
         console.log('LOG-UPDATE', machine)

         if (machine[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Data not found", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success updated", null))
      } catch (err) {
         console.log('LOG-ERR-GetByID', err)
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
   DeleteByID: async (req, res) => {
      id = parseInt(req.params.id)

      try {
         console.log('LOG-Params.id', id);
         dataObject = {
            deleted_at: TimeZoneIndonesia(),
         }

         const machine = await Machines.update(dataObject, {
            where: {
               id: id,
               deleted_at: null,
            }
         })
         console.log('LOG-UPDATE', machine)

         if (machine[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "Data not found", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status().send(Response(true, "200", "Success deleted", null))
      } catch (err) {
         console.log('LOG-ERR-GetByID', err)
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