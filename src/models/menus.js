module.exports = (sequelize, DataTypes) => {
  const Menus = sequelize.define(
    "Menus",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
      },
      name: {
        type: DataTypes.STRING
      },
      name_key: {
        type: DataTypes.STRING,
        unique: true
      },
      is_publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      tableName: "menus",
    }
  );
  return Menus;
};
