'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    fullname: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    tableName: "employee",
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  });

  Employee.associate = function (models) {
    Employee.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user'
    })

    Employee.belongsTo(models.Roles, {
      foreignKey: 'role_id',
      as: 'role'
    })
  }

  return Employee
};