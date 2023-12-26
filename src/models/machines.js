module.exports = (sequelize, DataTypes) => {
   const Machines = sequelize.define(
      "Machines",
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         name: {
            type: DataTypes.STRING
         },
         code: {
            type: DataTypes.STRING,
            unique: true
         },
         pic: {
            type: DataTypes.STRING,
            defaultValue: "",
         },
         status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
         createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
         }
      },
      {
         tableName: "machines",
      }
   );
   return Machines;
};
