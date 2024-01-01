const UUID = require('uuid');

const { Users } = require("../models");
const { AuthPayload } = require("../middleware/auth");
const { Response } = require("../utils/response/response");
const { EncryptPassword, CheckPassword, GenerateToken, GeneratePassword } = require("../utils/encrypt/encrypt");
const { TimeZoneIndonesia } = require("../utils/times/timezone");

module.exports = {
   Login: async (req, res) => {
      try {
         dataBody = {
            username: req.body.username,
            password: req.body.password,
         }

         Users.findOne({
            where: {
               username: dataBody.username,
            },
         }).then(async (user) => {
            if (!user) {
               res.set('Content-Type', 'application/json')
               res.status(404).send(Response(false, "404", "User not found", null))
               return
            }

            isValidPassword = await CheckPassword(dataBody.password, user.password)
            if (!isValidPassword) {
               res.set('Content-Type', 'application/json')
               res.status(401).send(Response(false, "401", "Password is wrong", null))
               return
            }
            uid = UUID.stringify(user.id)
            console.log('LOG-uid', uid)
            const payload = AuthPayload(uid)
            console.log('LOG-payload', payload)
            const token = await GenerateToken(payload)
            dataObject = {
               token: token,
            }

            res.set('Content-Type', 'application/json')
            res.status(200).send(Response(true, "200", "Success login", dataObject))
         })

      } catch (err) {
         console.log('er', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   Register: async (req, res) => {
      try {
         passwordHash = await EncryptPassword(req.body.password)
         uuid = UUID.v4()

         user = await Users.create({
            id: UUID.parse(uuid),
            username: req.body.username,
            password: passwordHash,
            created_at: TimeZoneIndonesia(),
         })
         console.log('LOG-ADD', user)
         dataObject = {
            id: uuid,
            username: user.username,
         }
         res.set('Content-Type', 'application/json')
         res.status(201).send(Response(true, "201", "Success created", dataObject))
      } catch (err) {
         console.log('er', err)
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
   GeneratePassword: async (req, res) => {
      try {
         password = await GeneratePassword()

         dataObject = {
            newPassword: password,
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success generated", dataObject))
      } catch (err) {
         console.log('er', err)
         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   },
   ChangePassword: async (req, res) => {
      try {
         passwordHash = await EncryptPassword(req.body.password)
         dataObject = {
            password: passwordHash,
            updated_at: TimeZoneIndonesia(),
         }

         const user = await Users.update(dataObject, {
            where: {
               username: req.body.username,
               deleted_at: null,
            }
         })
         console.log('LOG-UPDATE', user)

         if (user[0] == 0) {
            res.set('Content-Type', 'application/json')
            res.status(404).send(Response(false, "404", "username not found", null))
            return
         }

         res.set('Content-Type', 'application/json')
         res.status(200).send(Response(true, "200", "Success updated password", null))
      } catch (err) {
         console.log('LOG-ERR', err)

         res.set('Content-Type', 'application/json')
         res.status(500).send(Response(false, "500", "Internal Server Error", null))
      }
   }
}