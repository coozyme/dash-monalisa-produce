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
         result_daily: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         reporter_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
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
      }
   );
   return ProductionsReportDaily;
};