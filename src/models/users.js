module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define(
      "Users",
      {
         id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         username: {
            type: DataTypes.STRING,
         },
         password: {
            type: DataTypes.STRING,
         },
         created_at: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
         },
      },
      {
         tableName: "users",
      }
   );
   return Users;
};