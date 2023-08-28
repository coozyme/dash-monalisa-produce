module.exports = {
   productList: async (req, res) => {
      try {

         res.render('pages/product/products_list.ejs')
         //  res.json({ info: 'Node.js, Express, and Postgres API ok' })
      } catch (error) {
         console.log('er', error)
      }
   }
}