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
         material: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         quantity: {
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
            allowNull: true,
         },
         checklist_approved_date: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         created_at: {
            type: DataTypes.DATE,
            allowNull: true,
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