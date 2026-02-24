const { EmployeeProject } = require("../models");

async function assignEmployeeProjects(employeeProjectsData) {
  await EmployeeProject.bulkCreate(employeeProjectsData, {
    validate: true,
  });
}

module.exports = { assignEmployeeProjects };
