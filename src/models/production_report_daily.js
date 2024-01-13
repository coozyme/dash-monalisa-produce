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
            allowNull: true,
         },
         approver_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
         },
         checklist_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
         },
         checklist_approved_date: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         issue_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
         },
         notes: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         production_date: {
            type: DataTypes.DATE,
            allowNull: true,
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

   ProductionsReportDaily.associate = function (models) {
      ProductionsReportDaily.belongsTo(models.Productions, {
         foreignKey: 'production_id',
         as: 'production'
      })

      ProductionsReportDaily.belongsTo(models.Employee, {
         foreignKey: 'reporter_id',
         as: 'reporter'
      })

      ProductionsReportDaily.belongsTo(models.Employee, {
         foreignKey: 'approver_id',
         as: 'approver'
      })

      ProductionsReportDaily.belongsTo(models.IssueCategories, {
         foreignKey: 'issue_id',
         as: 'issue'
      })

      ProductionsReportDaily.hasMany(models.ProductionsReportDailyDetail, {
         foreignKey: 'report_daily_id',
         as: 'reportDailyDetail'
      })
   }

   return ProductionsReportDaily;
};