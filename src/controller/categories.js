const { IssueCategories } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   GetIssues: async (req, res) => {
      try {
         const issues = await IssueCategories.findAll({
            where: {
               deleted_at: null
            }
         })

         console.log('LOG-Get', issues)
         const dataObjects = []
         issues.forEach(data => {

            const dataObject = {
               id: data.dataValues.id,
               issueName: data.dataValues.name_issue,
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
   CreateIssue: async (req, res) => {
      try {
         const { issueName } = req.body

         var payload = {
            name_issue: issueName?.toUpperCase(),
            created_at: TimeZoneIndonesia(),
         }

         issue = await IssueCategories.create(payload)

         let dataObject = {
            issueName: issue.name_issue,
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
   UpdateIssue: async (req, res) => {
      try {
         const { id } = req.params;
         const { issueName } = req.body;

         const payload = {
            name_issue: issueName?.toUpperCase(),
            updated_at: TimeZoneIndonesia(),
         }

         issue = await IssueCategories.update(payload, {
            where: {
               id: id,
            }
         })

         if (issue[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed update", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success update", null))
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
   DeleteIssue: async (req, res) => {
      try {
         const { id } = req.params;

         const payload = {
            deleted_at: TimeZoneIndonesia(),
         }

         issue = await IssueCategories.update(payload, {
            where: {
               id: id,
            }
         })

         if (issue[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(400).send(Response(false, "400", "Failed delete", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success delete", null))
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