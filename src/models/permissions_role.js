'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var PermissionsRole = sequelize.define('PermissionsRole', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
  }, {
    tableName: "permissions_role",
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  });

  PermissionsRole.associate = function (models) {
    PermissionsRole.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      as: 'role'
    })

    PermissionsRole.belongsTo(models.Menus, {
      foreignKey: 'menu_id',
      as: 'menu'
    })

  }

  return PermissionsRole
};