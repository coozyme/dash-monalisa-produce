module.exports = (sequelize, DataTypes) => {
   const Productions = sequelize.define(
      "Productions",
      {
         id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         machine_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         total_target_daily: {
            type: DataTypes.NUMBER,
         },
         start_date: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         end_date: {
            type: DataTypes.DATE,
            allowNull: false,
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
         tableName: "productions",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return Productions;
};