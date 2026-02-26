const { Project, Department, EmployeeProject, Employee } = require("../models");
const { Op, fn, col, Sequelize } = require("sequelize");

async function createProjects(projects) {
  await Project.bulkCreate(projects, { validate: true });
}

// async function eagerLoadingQueries() {
//   return await Project.findAll({
//     include: {
//       model: Department,
//       as: "department",
//       attributes: ["deptName"],
//     },
//   });
// }

// async function eagerLoadingQueries() {
//   return await Project.findAll({
//     attributes: [
//       "projectId",
//       "projectName",
//       [
//         fn(
//           "COALESCE",
//           fn("SUM", col("employees->EmployeeProject.hours_worked")),
//           0,
//         ),
//         "totalHoursWorked",
//       ],
//     ],
//     include: {
//       model: Employee,
//       as: "employees",
//       attributes: [],
//       through: { attributes: [] },
//     },
//     group: ["Project.project_id"],
//   });
// }

async function eagerLoadingQueries() {
  return await Project.findAll({
    include: {
      model: Department,
      as: "department",
      attributes: ["deptName"],
    },
    include: {
      model: Employee,
      as: "employees",
      attributes: ["firstName", "lastName", "email"],
      through: { attributes: ["role", "hoursWorked"] },
    },
  });
}

module.exports = { createProjects, eagerLoadingQueries };
