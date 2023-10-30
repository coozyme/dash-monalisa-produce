'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.APP_STAGE || 'development';
const config = require('../config.js');
// const basename = path.dirname('/src/models/')
const basename = path.join(__dirname, '../../models')

// const config = require('../config.js')[env];
const db = {};

// var sequelize = new Sequelize(
//   config.DATABASES.MYSQL.DATABASE,
//   config.DATABASES.MYSQL.USERNAME,
//   config.DATABASES.MYSQL.PASSWORD,
//   {
//     host: config.DATABASES.MYSQL.HOST,
//     dialect: config.DATABASES.MYSQL.DIALECT,
//     pool: {
//       max: config.DATABASES.MYSQL.MAX,
//       min: config.DATABASES.MYSQL.MIN,
//       acuire: config.DATABASES.MYSQL.ACUIRE,
//       idle: config.DATABASES.MYSQL.IDLE
//     }
//   });

// db.Ping = function () {
//   sequelize
//     .authenticate()
//     .then(function (err) {
//       console.log('Connection database has been established successfully.');
//     })
//     .catch(function (err) {
//       console.log('Unable to connect to the database:', err);
//     });
// }

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


// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// if (config.use_env_variable) {
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
console.log('LOG-DDS', config)
var sequelize = new Sequelize(
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
  },
);

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     console.log('LOG-BASENAME', basename)
//     console.log('LOG-process.env.NODE_ENV', config.APP_STAGE)
//     console.log('LOG-FILE', file)
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     // console.log('LOG-DB->', __dirname, file, path.join(__dirname, file))
//     // var model = sequelize['import'](path.join(__dirname, file));
//     // var model = sequelize['import'](...);
//     const model = require(path.join(__dirname, '../../models/'))(sequelize, Sequelize)
//     // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//     db[model.name] = model;
//   });

const databases = Object.keys(config.DATABASES);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i].toLowerCase();
  console.log('LOG-AD', database)
  // const element = array[i];
  fs.readdirSync(path.join(__dirname, '../../models'))
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      console.log('LOG-ASDW', file)
      //const model = sequelize.import(path.join('./models', file));
      // const model = require(path.join(__dirname, '../../models', file))(sequelize, Sequelize)
      const model = require(path.join(__dirname, '../../models', file))
      sequelize[model.name] = model;
      console.log('LOG-sequelize[model.name]', sequelize[model.name])
    });

}

Object.keys(db).forEach(modelName => {
  console.log('LOG-OOP', modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;



module.exports = db;
