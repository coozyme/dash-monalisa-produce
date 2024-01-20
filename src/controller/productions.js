const { Productions, Machines } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   AddorderProduction: async (req, res) => {
      try {
         const { orderId, customer, machineId, status, notes, startProductionDate, endProductionDate } = req.body;

         const payload = {
            order_id: orderId,
            customer: customer,
            machine_id: machineId,
            status: status,
            notes: notes,
            start_date: startProductionDate,
            end_date: endProductionDate,
         }

         const dataProduction = await Productions.create({
            ...payload,
            created_at: TimeZoneIndonesia(),
         })

         if (!dataProduction) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed add production", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success add production", dataProduction))
      } catch (error) {
         console.log('er', error)
         msg = error.errors?.map(e => e.message)[0]
         if (error.name == "SequelizeUniqueConstraintError") {
            res.set('Content-Type', 'application/json')
            res.status(409).send(Response(false, "409", msg, null))
            return
         }
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   GetOrderProductions: async (req, res) => {
      try {
         const dataResponse = []
         const dataProduction = await Productions.findAll({
            where: {
               deleted_at: null
            },
            include: [
               {
                  model: Machines,
                  as: 'machine',
                  attributes: ['id', 'name', 'kode', 'pic_id', 'average_produce', 'status']
               }
            ]
         })

         if (!dataProduction) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed get production", null))
            return
         }

         dataProduction.map((item, index) => {
            dataResponse.push({
               id: item.id,
               orderId: item.order_id,
               customer: item.customer,
               machineId: item.machine_id,
               machineName: item.machine.name,
               machineKode: item.machine.kode,
               machineStatus: item.machine.status,
               status: item.status,
               notes: item.notes,
               startProductionDate: item.start_date,
               endProductionDate: item.end_date,
            })
         })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success get production", dataResponse))
      } catch (error) {
         console.log('er', error)
         msg = error.errors?.map(e => e.message)[0]
         if (error.name == "SequelizeUniqueConstraintError") {
            res.set('Content-Type', 'application/json')
            res.status(409).send(Response(false, "409", msg, null))
            return
         }
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))

      }
   },
   DeleteOrderProduction: async (req, res) => {
      try {
         const { orderId } = req.params;

         const dataProduction = await Productions.findOne({
            where: {
               order_id: orderId
            }
         })

         if (!dataProduction) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed get production", null))
            return
         }

         await Productions.update({
            deleted_at: TimeZoneIndonesia()
         }, {
            where: {
               order_id: orderId
            }
         })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success delete production", null))
      } catch (error) {
         console.log('er', error)
         msg = error.errors?.map(e => e.message)[0]
         if (error.name == "SequelizeUniqueConstraintError") {
            res.set('Content-Type', 'application/json')
            res.status(409).send(Response(false, "409", msg, null))
            return
         }
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   UpdateOrderProduction: async (req, res) => {
      try {
         const { id } = req.params;
         const { customer, orderId, machineId, status, notes, startProductionDate, endProductionDate } = req.body;

         const dataProduction = await Productions.findOne({
            where: {
               order_id: id
            }
         })

         if (!dataProduction) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed get production", null))
            return
         }

         const payload = {
            order_id: orderId,
            customer: customer,
            machine_id: machineId,
            status: status,
            notes: notes,
            start_date: startProductionDate,
            end_date: endProductionDate,
            updated_at: TimeZoneIndonesia()
         }

         await Productions.update(payload, {
            where: {
               order_id: id
            }
         })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success update production", null))
      } catch (error) {
         console.log('er', error)
         msg = error.errors?.map(e => e.message)[0]
         if (error.name == "SequelizeUniqueConstraintError") {
            res.set('Content-Type', 'application/json')
            res.status(409).send(Response(false, "409", msg, null))
            return
         }
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   }
}