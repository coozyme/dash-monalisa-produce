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
            type: DataTypes.BIGINT,
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
         createdAt: false,
         // If don't want updatedAt
         updatedAt: false,
      },
      {
         timestamps: false,
         tableName: "machines",
      }
   );
   return Machines;
};
