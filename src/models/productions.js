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
         order_id: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         customer: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         machine_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
         },
         status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ('OPEN', 'PROCCESS', 'FINISH', 'ON_HOLD')
         },
         start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         end_date: {
            type: DataTypes.DATEONLY,
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

   Productions.associate = function (models) {
      Productions.belongsTo(models.Machines, {
         foreignKey: 'machine_id',
         as: 'machine'
      })
   }
   return Productions;
};