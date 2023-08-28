module.exports = {
   index: async (req, res) => {
      try {
         const auth = true
         if (!auth) {
            res.redirect('/auth/login')
         }
         res.render('pages/dashboard.ejs')
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   }
}