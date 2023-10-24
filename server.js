const app = require('./src/app');
const db = require('./src/config/databases/db')

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Running Server: ', port);
  db.Ping()
});