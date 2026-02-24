module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      deptId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      deptName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      tableName: "departments",
      timestamps: true,
      underscored: true,
    },
  );

  return Department;
};
