'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // class Role extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // Role.init({
  //   id: {
  //     allowNull: false,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     type: Sequelize.INTEGER
  //   },
  //   role_name: {
  //     type: Sequelize.STRING
  //   },
  //   createdAt: {
  //     allowNull: false,
  //     type: Sequelize.DATE
  //   },
  //   updatedAt: {
  //     allowNull: false,
  //     type: Sequelize.DATE
  //   }
  // }, {
  //   sequelize,
  //   modelName: 'Role',
  // });
  // return Role;

  var Role = sequelize.define('role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role_name: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: "role"
  });

  Role.associate = function (models) {

  }

  return Role
};