module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          endDateValidation() {
            if (new Date(this.endDate) <= new Date(this.startDate)) {
              throw new Error("End date cannot be before the start date");
            }
          },
        },
      },
      duration: {
        type: DataTypes.VIRTUAL,
        get() {
          const diff = new Date(this.endDate) - new Date(this.startDate);
          return `${Math.ceil(diff / (1000 * 60 * 60 * 24))} days`;
        },
      },
      budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1,
        },
      },
      deptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "dept_id",
        },
        validate: {
          isInt: true,
          min: 1,
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      isCompleted: {
        type: DataTypes.VIRTUAL(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: "false",
      },
    },
    {
      tableName: "projects",
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Department, {
      foreignKey: "deptId",
      as: "department",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    Project.belongsToMany(models.Employee, {
      through: models.EmployeeProject,
      foreignKey: "projectId",
      otherKey: "empId",
      as: "employees",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Project;
};
