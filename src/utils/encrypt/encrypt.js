const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function EncryptPassword(password) {
   //Hash password
   const salt = await bcrypt.genSalt(10);
   const hasPassword = await bcrypt.hash(password, salt);
   console.log('LOG-EncryptPassword', password, hasPassword)
   return hasPassword;
}

function CheckPassword(password, hashPassword) {
   //Check password
   const isValidPassword = bcrypt.compare(password, hashPassword);
   return isValidPassword;
}

function GeneratePassword() {
   var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var passwordLength = 12;
   var password = "";
   for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
   }

   return password;
}

function GenerateToken(data) {
   const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
   return token;
}

module.exports = {
   EncryptPassword,
   CheckPassword,
   GeneratePassword,
   GenerateToken,
};
