module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define(
      "Users",
      {
         id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
            primaryKey: true,
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
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return Users;
};