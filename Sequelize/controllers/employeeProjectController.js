const {
  getAllEmployeeProjects,
  incrementHoursWorked,
  selectEmployeeProjectsWithAnalyticsQueries,
} = require("../services/employeeProjectService");

async function getEmployeeProjects(req, res) {
  try {
    const employeeProjects = await getAllEmployeeProjects();
    res.status(200).json(employeeProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getIncrementedHoursWorked(req, res) {
  try {
    const employeeProjects = await incrementHoursWorked();
    res.status(200).json(employeeProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeeProjectsWithAnalyticsQueries(req, res) {
  try {
    const employeeProjects = await selectEmployeeProjectsWithAnalyticsQueries();
    res.status(200).json(employeeProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getIncrementedHoursWorked,
  getEmployeeProjects,
  getEmployeeProjectsWithAnalyticsQueries,
};
