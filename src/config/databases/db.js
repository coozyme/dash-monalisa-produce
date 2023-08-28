'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
// const basename = path.dirname('/src/models/')
const basename = path.join(__dirname, 'models')
const env = process.env.APP_STAGE;
const config = require(__dirname + '/../src/config/config.js')[env];
const db = {};

// let sequelize = new Sequelize(config.DB_POSTGRES_NAME, config.DB_POSTGRES_USERNAME, config.DB_POSTGRES_PASSWORD, {
//    host: config.DB_POSTGRES_HOST,
//    dialect: config.DB_POSTGRES_DIALECT,
//    pool: {
//       max: config.DB_POSTGRES_POOL.max,
//       min: config.DB_POSTGRES_POOL.min,
//       acuire: config.DB_POSTGRES_POOL.acuire,
//       idle: config.DB_POSTGRES_POOL.idle
//    }
// });

//Extract the database information into an array
const databases = Object.keys(config.DATABASES);

//Loop over the array and create a new Sequelize instance for every database from config.js
for(let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = config.DATABASES[database];
    //Store the database connection in our db object
    db[database] = new Sequelize( dbPath.DATABASE, dbPath.USERNAME, dbPath.PASSWORD, dbPath );
}

fs
  .readdirSync(basename)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(basename, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
