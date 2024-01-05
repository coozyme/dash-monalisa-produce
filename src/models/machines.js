module.exports = (sequelize, DataTypes) => {
   const Machines = sequelize.define(
      "Machines",
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
         },
         name: {
            type: DataTypes.STRING
         },
         kode: {
            type: DataTypes.STRING,
            unique: true
         },
         pic_id: {
            type: DataTypes.STRING,
            defaultValue: "",
         },
         average_produce: {
            type: DataTypes.NUMBER,
            allowNull: false,
         },
         status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
         tableName: "machines",
         // If don't want createdAt
         createdAt: false,

         // If don't want updatedAt
         updatedAt: false,

      }
   );

   Machines.associate = function (models) {
      Machines.belongsTo(models.Employee, {
         foreignKey: 'pic_id',
         as: 'employee'
      })
   }
   return Machines;
};
