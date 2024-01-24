const { IssueCategories, Machines, Productions, ProductionsReportDaily, ProductionsReportDailyDetail } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   TotalMachineProduksi: async (req, res) => {
      try {
         const machines = await Machines.findAll({
            where: {
               deleted_at: null
            }
         })

         console.log('LOG-Get-machines', machines)
         const dataMachines = []
         machines.forEach(data => {

            const dataObject = {
               id: data.dataValues.id,
               machineKode: data.dataValues.kode,
               machineName: data.dataValues.name,
            }

            dataMachines.push(dataObject)
         });

         if (dataMachines.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }


         const productions = await Productions.findAll({
            where: {
               deleted_at: null
            }
         })

         console.log('LOG-Get-productions', productions)

         const dataProductions = []

         productions.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               orderId: data.dataValues.order_id,
               machineId: data.dataValues.machine_id,
            }

            dataProductions.push(dataObject)
         })

         if (dataProductions.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         const productionsReportDaily = await ProductionsReportDaily.findAll({
            where: {
               deleted_at: null
            }
         })


         console.log('LOG-Get-productionsReportDaily', productionsReportDaily)

         const dataProductionsReportDaily = []

         productionsReportDaily.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               productionId: data.dataValues.production_id,
               date: data.dataValues.date,
               total: data.dataValues.total,
            }

            dataProductionsReportDaily.push(dataObject)
         })

         if (dataProductionsReportDaily.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         const dataProductionsReportDailyDetail = []

         const productionsReportDailyDetail = await ProductionsReportDailyDetail.findAll({
            where: {
               deleted_at: null
            }
         })

         productionsReportDailyDetail.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               productionReportDailyId: data.dataValues.report_daily_id,
               quantity: data.dataValues.quantity,
               unit: data.dataValues.unit,
            }

            dataProductionsReportDailyDetail.push(dataObject)
         });

         console.log('LOG-Get-ProductionsReportDailyDetail', dataProductionsReportDailyDetail)



         // const dataObjects = []

         // dataMachines.forEach(machine => { 
         //    const dataObject = {
         //       id: machine.id,
         //       machineKode: machine.machineKode,
         //       machineName: machine.machineName,
         //       total: 0,
         //    }

         //    dataProductions.forEach(production => { 
         //       if (production.machineId == machine.id) { 
         //          dataProductionsReportDaily.forEach(productionReportDaily => { 
         //             if (productionReportDaily.productionId == production.id) { 
         //                dataObject.total += productionReportDaily.total
         //             }
         //          })
         //       }
         //    })

         //    dataObjects.push(dataObject)
         // })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataObjects))
      } catch (error) {

      }
   },
   StatusMachine: async (req, res) => {
      try {
         const machines = await Machines.findAll({
            where: {
               deleted_at: null
            }
         })

         console.log('LOG-Get-machines', machines)
         const dataMachines = []
         machines.forEach(data => {

            const dataObject = {
               id: data.dataValues.id,
               machineKode: data.dataValues.kode,
               machineName: data.dataValues.name,
               status: data.dataValues.status,
            }

            dataMachines.push(dataObject)
         });

         if (dataMachines.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataMachines))
      } catch (error) {
         console.log('LOG-er', error)
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