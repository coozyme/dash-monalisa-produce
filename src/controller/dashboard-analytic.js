const { IssueCategories, Machines, Productions, ProductionsReportDaily, ProductionsReportDailyDetail } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");
const { GetFirstDateAndLastDateOfMonth, GetFirstAndLastDatesPerMonthOfYear, GetWeekdayDates, GetThisMonthAndYear } = require("../utils/times/datetime");
const { Op } = require("sequelize");
const { getColorStatus, getCountPercentageStatusProduction } = require("./helper-analytic");
const { generateNewColor } = require("../utils/color/generate");
const { PercentageCalcuate } = require("../utils/calculation/calculation");

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
         labels = []
         let countStatusProduksi = []
         let dataOfDatSet = []
         let colorStatusData = []
         const dataResponseStatusProduksi = {
            dataUnit: "StatusProduction",
            legend: false,
            datasets: [
               {
                  borderColor: "#fff",
                  backgroundColor: colorStatusData,
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

         countStatusProduksi.forEach(data => {
            colorStatusData.push(data.color)
            dataOfDatSet.push(data.count)
         })


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
   },
   IssueProduksi: async (req, res) => {
      try {
         const dateRangeMonth = GetFirstDateAndLastDateOfMonth()

         const produksiDaily = await ProductionsReportDaily.findAll({
            where: {
               deleted_at: null,
               issue_id: {
                  [Op.not]: null
               },
               production_date: {
                  [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               },
            },
            include: [
               {
                  model: IssueCategories,
                  as: 'issue',
                  attributes: ['id', 'name_issue'],
               }
            ]
         })

         labels = []
         let countIssueProduksi = []
         let dataOfDatSet = []
         let colorIssueData = []
         const dataResponseIssueProduksi = {
            dataUnit: "StatusProduction",
            legend: false,
            datasets: [
               {
                  borderColor: "#fff",
                  backgroundColor: colorIssueData,
                  data: dataOfDatSet,
               },
            ],
            startDate: dateRangeMonth.firstDate.toDateString(),
            endDate: dateRangeMonth.lastDate.toDateString(),
            dataView: countIssueProduksi,
            totalData: produksiDaily.length,
         }


         produksiDaily.forEach(data => {
            // const { status, color } = getColorStatus(data.status)
            // console.log('LOG-status', status)
            const dataObject = {
               issue: data.issue.name_issue,
               count: 1,
               percent: 0,
               color: generateNewColor(),
            }
            // console.log('LOG-DDD', data, dataObject.status)

            const findStatus = countIssueProduksi.find((data) => { return data.issue === dataObject.issue })
            if (findStatus) {
               findStatus.count += 1
               findStatus.percent = getCountPercentageStatusProduction(produksiDaily.length, findStatus.count)
            } else {
               countIssueProduksi.push(dataObject)
               dataObject.percent = getCountPercentageStatusProduction(produksiDaily.length, dataObject.count)
            }

         });

         countIssueProduksi.forEach(data => {
            colorIssueData.push(data.color)
            dataOfDatSet.push(data.count)
         })


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponseIssueProduksi))
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
   OrderProduksiAnalytic: async (req, res) => {
   },
   StatusChecklistApproval: async (req, res) => {
      try {
         const dateRangeMonth = GetFirstDateAndLastDateOfMonth()

         const totalChecklist = await ProductionsReportDaily.count({
            where: {
               deleted_at: null,
               // start_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },
               // end_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },
            },
            include: [
               {
                  model: Productions,
                  as: 'production',
                  attributes: ['id', 'produksi', 'date', 'production_report_daily_id'],
                  where: {
                     deleted_at: null,
                     start_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     },
                     end_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     }
                  },
               }
            ]
         })

         const checklistApproved = await ProductionsReportDaily.count({
            where: {
               deleted_at: null,
               // start_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },
               // end_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },
               checklist_approved: true
            },
            include: [
               {
                  model: Productions,
                  as: 'production',
                  attributes: ['id', 'produksi', 'date', 'production_report_daily_id'],
                  where: {
                     deleted_at: null,
                     start_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     },
                     end_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     }
                  },
               }
            ]
         })

         const checklistNotApproved = await ProductionsReportDaily.count({
            where: {
               deleted_at: null,
               // start_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },
               // end_date: {
               //    [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
               // },

               checklist_approved: false
            },
            include: [
               {
                  model: Productions,
                  as: 'production',
                  attributes: ['id', 'produksi', 'date', 'production_report_daily_id'],
                  where: {
                     deleted_at: null,
                     start_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     },
                     end_date: {
                        [Op.between]: [dateRangeMonth.firstDate, dateRangeMonth.lastDate]
                     }
                  },
               }
            ]
         })

         const dataResponse = {
            approved: checklistApproved,
            notApproved: checklistNotApproved,
            totalChecklistApproval: totalChecklist,
            dateRange: `${dateRangeMonth.firstDate.toDateString()} - ${dateRangeMonth.lastDate.toDateString()}`,
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponse))
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
   OrderProduksiOverview: async (req, res) => {
      try {
         const dateRangeMonths = GetFirstAndLastDatesPerMonthOfYear()

         const dataResponse = {
            total: 0,
            percentage: "",
            year: "",
            isUp: false,
            labels: [],
            dataUnit: "Quantity",
            stacked: true,
            datasets: [
               {
                  label: "Total",
                  barPercentage: 0.7,
                  categoryPercentage: 0.7,
                  backgroundColor: [],
                  data: [],
               },
            ],
         }
         // console.log('LOG-dateRangeMonths', dateRangeMonths)
         for (let i = 0; i < dateRangeMonths.length; i++) {
            const produksi = await Productions.count({
               where: {
                  deleted_at: null,
                  start_date: {
                     [Op.between]: [dateRangeMonths[i].firstDate, dateRangeMonths[i].lastDate]
                  },
                  end_date: {
                     [Op.between]: [dateRangeMonths[i].firstDate, dateRangeMonths[i].lastDate]
                  },
               }
            })
            dataResponse.total += produksi
            dataResponse.year = dateRangeMonths[i].year
            dataResponse.labels.push(dateRangeMonths[i].month)
            dataResponse.datasets[0].data.push(produksi)
            color = i + 1 != dateRangeMonths.length ? "rgba(133, 79, 255, 0.2)" : "rgba(133, 79, 255, 1)"
            dataResponse.datasets[0].backgroundColor.push(color)
         }

         const dataCounts = dataResponse?.datasets[0]?.data

         const oldValue = dataCounts[dataCounts?.length - 2]
         const newValue = dataCounts[dataCounts?.length - 1]

         console.log('LOFF-', typeof oldValue)
         console.log('LOF2-', typeof newValue)
         console.log('LOF3-', newValue > oldValue)

         dataResponse.percentage = PercentageCalcuate(oldValue, newValue)
         dataResponse.isUp = newValue > oldValue

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponse))
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
   IssueProduksiOverview: async (req, res) => {
      try {
         const dateRangeMonths = GetFirstAndLastDatesPerMonthOfYear()

         const dataResponse = {
            total: 0,
            percentage: "",
            year: "",
            isUp: false,
            labels: [],
            dataUnit: "Quantity",
            stacked: true,
            datasets: [
               {
                  label: "Total",
                  barPercentage: 0.7,
                  categoryPercentage: 0.7,
                  backgroundColor: [],
                  data: [],
               },
            ],
         }

         for (let i = 0; i < dateRangeMonths.length; i++) {
            const produksi = await ProductionsReportDaily.count({
               where: {
                  deleted_at: null,
                  issue_id: {
                     [Op.not]: null,
                  },
                  production_date: {
                     [Op.between]: [dateRangeMonths[i].firstDate, dateRangeMonths[i].lastDate]
                  }
               },
               include: [
                  {
                     model: Productions,
                     as: "production",
                     attributes: ['id', 'start_date', 'end_date'],
                     where: {
                        deleted_at: null,
                     }
                  },
               ]
            })

            dataResponse.total += produksi
            dataResponse.labels.push(dateRangeMonths[i].month)
            dataResponse.year = dateRangeMonths[i].year
            dataResponse.datasets[0].data.push(produksi)
            color = i + 1 != dateRangeMonths.length ? "rgba(133, 79, 255, 0.2)" : "rgba(133, 79, 255, 1)"
            dataResponse.datasets[0].backgroundColor.push(color)
         }

         const dataCounts = dataResponse?.datasets[0]?.data

         const oldValue = dataCounts[dataCounts?.length - 2]
         const newValue = dataCounts[dataCounts?.length - 1]

         console.log('LOFF-', typeof oldValue)
         console.log('LOF2-', typeof newValue)
         console.log('LOF3-', newValue > oldValue)

         dataResponse.percentage = PercentageCalcuate(oldValue, newValue)
         dataResponse.isUp = newValue > oldValue

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Data found", dataResponse))
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
}