const jwt = require('jsonwebtoken');
const { Response } = require('../utils/response/response');

const secretKey = process.env.SECRET_KEY;

function AuthPayload(uid) {
   return {
      uid: uid,
   }
}

const AuthenticateToken = (req, res, next) => {
   // Mendapatkan token dari header Authorization
   const tokenBearer = req.header('Authorization');

   // Memeriksa apakah token ada
   if (!tokenBearer) {
      return res.status(401).json({ message: 'Token is required' });
   }
   // Split the header value to get the token part
   const [bearer, token] = tokenBearer.split(' ');

   // Check if the header has the correct format
   if (bearer !== 'Bearer' || !token) {
      res.set('Content-Type', 'application/json')
      res.status(401).send(Response(false, "401", "Invalid Authorization", null));
      return
   }
   // Memeriksa dan mendecode token
   jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
         if (err.name === 'TokenExpiredError') {
            res.set('Content-Type', 'application/json')
            res.status(401).send(Response(false, "401", "Token Expired", null));
            return
         } else {
            res.set('Content-Type', 'application/json')
            res.status(401).send(Response(false, "401", "Invalid Token", null));
            return
         }
      } else {
         // Menyimpan informasi pengguna yang terdekripsi pada objek req untuk digunakan oleh rute selanjutnya
         req.contextAuth = decoded;
         console.log('req.user', req.user)
         next(); // Lanjut ke middleware atau rute berikutnya
      }
   });
}


module.exports = { AuthPayload, AuthenticateToken };