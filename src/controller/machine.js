const { Machines } = require("../models");
const { Response } = require("../utils/response/response");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   Add: async (req, res) => {
      console.log('LOG-BODY', req.body);
      try {
         dataObject = {
            name: req.body.name,
            kode: req.body.code,
            pic_id: req.body.pic,
            average_produce: req.body.averageProduce,
            status: req.body.status,
            created_at: TimeZoneIndonesia(),
         }
         const machine = Machines.create(dataObject)
         // const machine = machines.findAll()
         console.log('LOG-ADD', Machines)
         // const dataResponses = []
         // dataMenus.forEach(data => {
         //    const dataObject = {)
         //       id: data.dataValues.id,
         //       name: data.dataValues.name,
         //       keyName: data.dataValues.name_key
         //    }
         //    dataResponses.push(dataObject)
         // });

         res.set('Content-Type', 'application/json')
         res.status(201).json(Response(true, "201", "Success created", null))
      } catch (error) {
         console.log('LOG-ERR-Add', error.message)
         res.set('Content-Type', 'application/json')
         res.status(500).json(Response(false, "500", "Internal Server Error", null))
      }
   }
}