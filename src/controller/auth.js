module.exports = {
   login: async (req, res) => {
      try {
         var pic = {
            logo: "../assets/img/stisla-fill.svg"
         }
         res.render('pages/auth/login.ejs', { pic: pic })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   },
   forgotPassword: async (req, res) => {
      try {
         var pic = {
            logo: "../assets/img/stisla-fill.svg"
         }
         res.render('pages/auth/forgot_password.ejs', { pic: pic })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   }
}