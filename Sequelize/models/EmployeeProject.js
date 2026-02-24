module.exports = (sequelize, DataTypes) => {
  const EmployeeProject = sequelize.define(
    "EmployeeProject",
    {
      empId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "employees",
          key: "id",
        },
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "projects",
          key: "project_id",
        },
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      hoursWorked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      tableName: "employee_projects",
      timestamps: true,
      underscored: true,
    },
  );

  return EmployeeProject;
};
