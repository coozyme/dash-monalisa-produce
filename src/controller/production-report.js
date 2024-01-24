const { Productions, ProductionsReportDaily, ProductionsReportDailyDetail, IssueCategories, Employee } = require("../models");
const { ConvertToMeter, CalculateMaterialProduction } = require("../utils/calculation/calculation");
const { Response } = require("../utils/response/response");
const { ConvertDateTimeUTC } = require("../utils/times/datetime");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   CreateReporting: async (req, res) => {
      try {
         const { productionId, reportedBy, materialData, notes, issueId, productionDate } = req.body;

         const payloadProductionDaily = {
            production_id: productionId,
            reporter_id: reportedBy,
            issue_id: issueId,
            production_date: productionDate,
            notes: notes,
         }

         const reportDaily = await ProductionsReportDaily.create({
            ...payloadProductionDaily,
            created_at: TimeZoneIndonesia(),
         }).then(async (dataReport) => {
            console.log('LOG-dataReport', dataReport)
            const payloadProductionDailyDetail = []
            materialData?.forEach((data) => {
               console.log('LOG-dataReport-matrial', data)
               const payload = {
                  report_daily_id: dataReport.id,
                  material: data.material,
                  quantity: data.quantity,
                  unit: data.unit,
                  created_at: TimeZoneIndonesia(),
               }
               payloadProductionDailyDetail.push(payload)

            });
            await ProductionsReportDailyDetail.bulkCreate(payloadProductionDailyDetail)


         }).catch((err) => {
            console.log('LOG-reportDaily-err', err)
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed add production", null))
            return
         })

         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success add production", null))
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
   DetailReporting: async (req, res) => {
      try {
         const { productionId } = req.query

         const productionReportDaily = await ProductionsReportDaily.findAll({
            where: {
               production_id: parseInt(productionId),
               deleted_at: null
            },
            include: [
               {
                  model: Productions,
                  as: 'production',
                  attributes: ['id', 'order_id', 'customer', 'machine_id', 'status', 'start_date', 'end_date'],
               },
               {
                  model: IssueCategories,
                  as: 'issue',
                  attributes: ['id', 'name_issue']
               },
               {
                  model: Employee,
                  as: 'approver',
                  attributes: ['id', 'fullname']
               },
               {
                  model: Employee,
                  as: 'reporter',
                  attributes: ['id', 'fullname']
               }
            ]
         })

         if (!productionReportDaily) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed get production report", null))
            return
         }


         console.log('LOG-productionReportDaily-1', productionReportDaily[0])
         console.log('LOG-productionReportDaily-2', productionReportDaily[1])
         const reportDailyId = []
         const productionReportDailyData = []
         const productionDetailReponse = {
            orderId: productionReportDaily[0].production.order_id,
            customer: productionReportDaily[0].production.customer,
            machineId: productionReportDaily[0].production.machine_id,
            status: productionReportDaily[0].production.status,
            startDate: productionReportDaily[0].production.start_date,
            endDate: productionReportDaily[0].production.end_date ?? null,
            productionDetail: productionReportDailyData,
         }

         // production
         const materialDataDaily = []
         productionReportDaily.forEach((data) => {
            let checklistApprovedDate = null
            if (data.dataValues.checklist_approved_date) {
               checklistApprovedDate = ConvertDateTimeUTC(data.dataValues.checklist_approved_date)
            }
            const productionReportDailyDataObject = {
               id: data.id,
               issueId: data?.issue?.id,
               issueName: data?.issue?.name_issue,
               reporterId: data.reporter.id ?? null,
               reporterName: data.reporter.fullname ?? null,
               approverId: data?.approver?.id ?? null,
               approverName: data?.approver?.fullname ?? null,
               isChecklistApproved: data.checklist_approved,
               checklistApprovedDate: checklistApprovedDate,
               productionDate: data.production_date,
               notes: data.notes,
               isChecklistedAllMaterial: false,
               materialData: [],
            }

            reportDailyId.push(data.id)
            productionReportDailyData.push(productionReportDailyDataObject)
         })

         const productionReportDailyDetail = await ProductionsReportDailyDetail.findAll({
            where: {
               report_daily_id: reportDailyId,
               deleted_at: null
            },
         })
         console.log('LOG-productionReportDailyData', productionReportDailyData[0].id)
         productionReportDailyDetail.forEach((data, idx) => {
            console.log('LOG-data-productionReportDailyDetail-dataValues', data.dataValues)

            let checklistApprovedDate = null
            if (data.dataValues.checklist_approved_date) {
               checklistApprovedDate = ConvertDateTimeUTC(data.dataValues.checklist_approved_date)
            }
            const d = {
               id: data.dataValues.id,
               reportDailyId: data.dataValues.report_daily_id,
               material: data.dataValues.material,
               quantity: data.dataValues.quantity,
               unit: data.dataValues.unit,
               isChecklistApproved: data.dataValues.checklist_approved,
               checklistApprovedDate: checklistApprovedDate,
            }


            materialDataDaily.push(d)
         })


         // add mapping data to every daily report
         materialDataDaily.forEach((data, idx) => {
            productionReportDailyData.forEach((data2, idx2) => {
               // const lengthMaterialData = materialDataDaily.length

               if (data.reportDailyId == data2.id) {
                  let checkAllApproveMaterial = true
                  console.log('LOG-data.isChecklistApproved', data.isChecklistApproved)
                  if (data.isChecklistApproved == false || data.isChecklistApproved == null) {
                     checkAllApproveMaterial = false
                  }

                  productionReportDailyData[idx2].materialData.push(data)
                  productionReportDailyData[idx2].isChecklistedAllMaterial = checkAllApproveMaterial
               } else {
                  countMaterialData = []
               }


            })
         })

         // productionReportDailyData.forEach((data, idx) => {
         //    const lengthMaterialData = data.materialData.length
         //    let countMaterialData = []
         //    data.materialData.forEach((d, idx2) => {
         //       if (d?.isChecklistApproved == true) {
         //          countMaterialData.push(true)
         //       } else {
         //          countMaterialData.push(false)
         //       }
         //       console.log('LOG-d?.isChecklistApproved', d?.isChecklistApproved)
         //       console.log('LOG-countMaterialData', countMaterialData.length, lengthMaterialData)
         //       if (countMaterialData.length == lengthMaterialData) {
         //          const isChecklistedAllMaterial = countMaterialData.find((o) => o == false)
         //          console.log('LOG-isChecklistedAllMaterial', isChecklistedAllMaterial)
         //          productionDetailReponse.isChecklistedAllMaterial = isChecklistedAllMaterial ?? true
         //       }
         //    })
         // })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success get production", productionDetailReponse))
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
   ChecklistMaterial: async (req, res) => {
      try {
         const { materialId, isApprove, approverId, reportDailyId } = req.query
         console.log('LOG-req.query', materialId, isApprove, approverId, reportDailyId)
         if (!reportDailyId && !materialId) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed approve production", null))
            return
         }

         let checklistDate = null

         if (isApprove == 'true') {
            checklistDate = TimeZoneIndonesia()
         }

         if (reportDailyId && approverId) {
            await ProductionsReportDaily.update({
               approver_id: parseInt(approverId),
               checklist_approved: isApprove,
               checklist_approved_date: checklistDate,
               updated_at: TimeZoneIndonesia(),
            }, {
               where: {
                  id: parseInt(reportDailyId),
                  deleted_at: null
               }
            })
         }

         if (materialId) {
            await ProductionsReportDailyDetail.update({
               checklist_approved: isApprove,
               checklist_approved_date: checklistDate,
               updated_at: TimeZoneIndonesia(),
            }, {
               where: {
                  id: parseInt(materialId),
                  deleted_at: null
               }
            })
         }


         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success approve production", null))
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
   ApproveReport: async (req, res) => {
      try {
         const { reportDailyId, approverId, isChecklistAllMaterial } = req.query

         if (!reportDailyId && !approverId) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed approve production", null))
            return
         }

         if (isChecklistAllMaterial == 'false') {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed approve production", null))
            return
         }

         await ProductionsReportDaily.update({
            approver_id: parseInt(approverId),
            checklist_approved: true,
            checklist_approved_date: TimeZoneIndonesia(),
            updated_at: TimeZoneIndonesia(),
         }, {
            where: {
               id: reportDailyId,
               deleted_at: null
            }
         })

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success approve production", null))
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