const { EmployeeProject, sequelize } = require("../models");
const { Op, fn, col } = require("sequelize");

async function assignEmployeeProjects(employeeProjectsData) {
  await EmployeeProject.bulkCreate(employeeProjectsData, {
    validate: true,
  });
}

async function getAllEmployeeProjects() {
  return await EmployeeProject.findAll();
}

async function incrementHoursWorked() {
  await EmployeeProject.increment("hoursWorked", {
    by: 30,
    where: { projectId: 1 },
  });
  return await EmployeeProject.findByPk(1);
}

// async function selectEmployeeProjectsWithAnalyticsQueries() {
//   return await EmployeeProject.findAll({
//     attributes: [
//       "projectId",
//       [fn("SUM", col("hours_worked")), "totalHoursWorked"],
//     ],
//     group: ["projectId"],
//   });
// }

// async function selectEmployeeProjectsWithAnalyticsQueries() {
//   const [rows] = await sequelize.query(
//     `SELECT emp_id, ROUND(AVG(hours_worked), 2) as avgHoursWorked FROM employee_projects GROUP BY emp_id`,
//   );
//   return rows;
// }

// async function selectEmployeeProjectsWithAnalyticsQueries() {
//   const [rows] = await sequelize.query(
//     `SELECT project_id, SUM(hours_worked) as totalHoursWorked FROM employee_projects GROUP BY project_id HAVING totalHoursWorked > 500`,
//   );
//   return rows;
// }

async function selectEmployeeProjectsWithAnalyticsQueries() {
  const [rows] = await sequelize.query(
    `SELECT emp_id, SUM(hours_worked) as totalHoursWorked FROM employee_projects GROUP BY emp_id ORDER BY totalHoursWorked DESC LIMIT 1`,
  );
  return rows;
}

module.exports = {
  getAllEmployeeProjects,
  assignEmployeeProjects,
  incrementHoursWorked,
  selectEmployeeProjectsWithAnalyticsQueries,
};
