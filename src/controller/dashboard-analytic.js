const { IssueCategories, Machines, Productions, ProductionsReportDaily, ProductionsReportDailyDetail } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");
const { GetFirstDateAndLastDateOfMonth } = require("../utils/times/datetime");
const { Op } = require("sequelize");
const { getColorStatus, getCountPercentageStatusProduction } = require("./helper-analytic");

module.exports = {
   TotalProduksiDailyPerMesin: async (req, res) => {
      try {
         const produksiHarian = await ProductionsReportDaily.findAll({
            where: {
               deleted_at: null
            },
            include: [
               {
                  model: ProductionsReportDailyDetail,
                  as: 'detail',
                  attributes: ['id', 'produksi', 'date', 'production_report_daily_id'],
               },
               {
                  model: Machines,
                  as: 'machine',
                  attributes: ['id', 'name', 'kode', 'pic_id', 'average_produce', 'status'],
               }
            ]
         })

         const dataResponse = []
         produksiHarian.forEach(data => {
            const dataObject = {
               id: data.dataValues.id,
               machineId: data.dataValues.machine_id,
               machineName: data.dataValues.machine.name,
               machineKode: data.dataValues.machine.kode,
               picId: data.dataValues.machine.pic_id,
               averageProduce: data.dataValues.machine.average_produce,
               status: data.dataValues.machine.status,
               date: data.dataValues.date,
               detail: data.dataValues.detail,
            }
            dataResponse.push(dataObject)
         });

         if (dataResponse.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponse))
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
   },
   TotalStatusProduksi: async (req, res) => {
      try {
         const dateRangeMonth = GetFirstDateAndLastDateOfMonth()
         // const status = [
         //    { status: 'OPEN' },
         //    { status: 'CLOSED' },
         //    { status: 'CANCEL' },
         //    { status: ''}
         // ]

         const produksi = await Productions.findAll({
            where: {
               deleted_at: null,
               start_date: {
                  [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               },
               end_date: {
                  [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               },
            }
         })

         console.log('LOG-Get-produksi', produksi)
         // let dataStatus = 
         labels = []
         let countStatusProduksi = []
         let dataOfDatSet = []
         let colorStatuData = []
         const dataResponseStatusProduksi = {
            dataUnit: "StatusProduction",
            legend: false,
            datasets: [
               {
                  borderColor: "#fff",
                  backgroundColor: colorStatuData,
                  data: dataOfDatSet,
               },
            ],
            startDate: dateRangeMonth.firstDate.toDateString(),
            endDate: dateRangeMonth.lastDate.toDateString(),
            dataView: countStatusProduksi,
            totalData: produksi.length,
         }

         produksi.forEach(data => {
            const { status, color } = getColorStatus(data.status)
            console.log('LOG-status', status)
            const dataObject = {
               status: status,
               count: 1,
               percent: 0,
               color: color,
            }

            const findStatus = countStatusProduksi.find((data) => { return data.status == dataObject.status })
            console.log('LOG-findStatus--1', findStatus)
            if (findStatus) {

               findStatus.count += 1
               findStatus.percent = getCountPercentageStatusProduction(produksi.length, findStatus.count)
            } else {
               countStatusProduksi.push(dataObject)
               dataObject.percent = getCountPercentageStatusProduction(produksi.length, dataObject.count)
            }

         });

         if (countStatusProduksi.length == 0) {
            res.set('Content-Type', 'application/json')
            res.status(204).send(Response(false, "204", "Data does not exist", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponseStatusProduksi))
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
