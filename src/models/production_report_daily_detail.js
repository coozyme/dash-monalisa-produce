module.exports = (sequelize, DataTypes) => {
   const ProductionsReportDailyDetail = sequelize.define(
      "ProductionsReportDailyDetail",
      {
         id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         report_daily_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         material_name: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         total_production: {
            type: DataTypes.NUMBER,
            allowNull: false,
         },
         unit: {
            type: DataTypes.ENUM,
            values: ['Meter', 'Yard', 'Kg', 'Lembar', 'Roll'],
            defaultValue: 'Meter',
         },
         checklist_approved: {
            type: DataTypes.BOOLEAN,
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
         tableName: "productions_report_daily_detail",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return ProductionsReportDailyDetail;
};