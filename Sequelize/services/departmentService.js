const { Department, Employee, Project, sequelize } = require("../models");
const { Op, fn, col, Sequelize } = require("sequelize");

async function createDepartments(departments) {
  await Department.bulkCreate(departments, { validate: true });
}

async function getAllDepartments() {
  return await Department.findAll();
}

async function updateDeptLocation() {
  await Department.update({ location: "New York" }, { where: { deptId: 4 } });
  return await Department.findByPk(4);
}

// async function eagerLoadingQueries() {
//   return await Department.findAll({
//     attributes: [
//       "deptId",
//       "deptName",
//       "location",
//       [fn("COALESCE", fn("COUNT", col("employees.id")), 0), "employeesCount"],
//     ],
//     include: {
//       model: Employee,
//       as: "employees",
//       attributes: [],
//     },
//     group: ["department.dept_id"],
//   });
// }

async function eagerLoadingQueries() {
  return await Department.findAll({
    include: {
      model: Project,
      as: "projects",
      attributes: ["projectId", "projectName"],
    },
    include: {
      model: Employee,
      as: "employees",
      attributes: ["firstName", "lastName", "email"],
      include: {
        model: Project,
        as: "projects",
        attributes: ["projectId", "projectName"],
        through: { attributes: [] },
      },
    },
  });
}

module.exports = {
  createDepartments,
  getAllDepartments,
  updateDeptLocation,
  eagerLoadingQueries,
};
