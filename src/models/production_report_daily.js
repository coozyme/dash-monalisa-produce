module.exports = (sequelize, DataTypes) => {
   const ProductionsReportDaily = sequelize.define(
      "ProductionsReportDaily",
      {
         id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         production_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         reporter_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         approver_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         checklist_approved: {
            type: DataTypes.BOOLEAN,
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
         issue_id: {
            type: DataTypes.BIGINT,
         },
         notes: {
            type: DataTypes.TEXT,
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
         tableName: "productions_report_daily",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,
      }
   );
   return ProductionsReportDaily;
};