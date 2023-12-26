module.exports = {
   role: async (req, res) => {
      try {
         // var pic = {
         //    logo: "../assets/img/stisla-fill.svg"
         // }
         let dataMenu = {
            nameMenu: "",
            accessMenu: ""
         };
         res.render('pages/management-user/role.ejs', { dataMenu: dataMenu })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   },
   addRole: async (req, res) => {
      try {
         var pic = {
            logo: "../assets/img/stisla-fill.svg"
         }
         res.render('pages/management-user/add-role.ejs', { pic: pic })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   },
   permission: async (req, res) => {
      try {
         var pic = {
            logo: "../assets/img/stisla-fill.svg"
         }
         res.render('pages/management-user/permission.ejs', { pic: pic })
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   },
   // forgotPassword: async (req, res) => {
   //    try {
   //       var pic = {
   //          logo: "../assets/img/stisla-fill.svg"
   //       }
   //       res.render('pages/auth/forgot_password.ejs', { pic: pic })
   //       //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
   //    } catch (error) {
   //       console.log('er', error)
   //    }
   // }
}