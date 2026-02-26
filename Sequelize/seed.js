const { sequelize } = require("./models");
const { createDepartments } = require("./services/departmentService");
const {
  createEmployees,
  assignManager,
} = require("./services/employeeService");
const { createEmployee } = require("./services/employeeService");
const { createProjects } = require("./services/projectService");
const { assignEmployeeProjects } = require("./services/employeeProjectService");
const employeesData = require("./data/employeesData");
const departmentsData = require("./data/departmentsData");
const projectsData = require("./data/projectsData");
const employeeProjectsData = require("./data/employeeProjectsData");

async function runSeeder() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");

    await createDepartments(departmentsData);
    await createEmployees(employeesData);
    await createEmployee({
      firstName: "Ekalavya",
      lastName: "Patel",
      email: "ekalavya.patel@company.com",
      hireDate: "2023-02-15",
      salary: 80000,
      deptId: 1,
      // status: "ACTIVE",
      managerId: 1,
    });
    await assignManager();
    await createProjects(projectsData);
    await assignEmployeeProjects(employeeProjectsData);

    console.log("Seeding completed successfully!");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

runSeeder();
