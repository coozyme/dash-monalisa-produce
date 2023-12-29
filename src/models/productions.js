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
         kode_order: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         machine_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         target_daily: {
            type: DataTypes.BIGINT,
         },
         total_target: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
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
      }
   );
   return Productions;
};