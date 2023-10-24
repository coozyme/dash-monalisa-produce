'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
// const basename = path.dirname('/src/models/')
const basename = path.join(__dirname, 'models')

// const env = configs.APP_STAGE;
// const config = require('../config.js')[env];
const db = {};

let sequelize = new Sequelize(
  config.DATABASES.MYSQL.DATABASE,
  config.DATABASES.MYSQL.USERNAME,
  config.DATABASES.MYSQL.PASSWORD,
  {
    host: config.DATABASES.MYSQL.HOST,
    dialect: config.DATABASES.MYSQL.DIALECT,
    pool: {
      max: config.DATABASES.MYSQL.MAX,
      min: config.DATABASES.MYSQL.MIN,
      acuire: config.DATABASES.MYSQL.ACUIRE,
      idle: config.DATABASES.MYSQL.IDLE
    }
  });

db.Ping = function () {
  sequelize
    .authenticate()
    .then(function (err) {
      console.log('Connection database has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
}

//Extract the database information into an array
// const databases = Object.keys(config.DATABASES);

// //Loop over the array and create a new Sequelize instance for every database from config.js
// for (let i = 0; i < databases.length; ++i) {
//   let database = databases[i];
//   let dbPath = config.DATABASES[database];
//   //Store the database connection in our db object
//   db[database] = new Sequelize(dbPath.DATABASE, dbPath.USERNAME, dbPath.PASSWORD, dbPath);


// }

// fs
//   .readdirSync(basename)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(basename, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
