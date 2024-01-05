'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Roles = sequelize.define('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    title: {
      type: DataTypes.STRING
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    tableName: "roles",
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  });

  Roles.associate = function (models) {

  }

  return Roles
};