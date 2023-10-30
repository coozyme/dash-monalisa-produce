// import { sequelize, DataTypes } from "../config/databases/db.js";
'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const { sequelize } = require('../config/databases/db');
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menus.init({
    name: DataTypes.STRING,
    name_key: DataTypes.STRING,
    is_publish: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menus',
  });
  return Menus;
};

// const MenusModel = sequelize.define("menus", {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   name: {
//     type: Sequelize.STRING
//   },
//   name_key: {
//     type: Sequelize.STRING
//   },
//   is_publish: {
//     type: Sequelize.BOOLEAN
//   },
//   createdAt: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   updatedAt: {
//     allowNull: false,
//     type: Sequelize.DATE
//   }
// });

// export default MenusModel

// module.exports = (sequelize, DataTypes) => {
//   var menus = sequelize.define('menus', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     name_key: {
//       type: Sequelize.STRING
//     },
//     is_publish: {
//       type: Sequelize.BOOLEAN
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     }
//   });
//   menus.associate = function (models) {
//     // associations can be defined here
//   };
//   return menus;
// }