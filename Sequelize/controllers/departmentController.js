const {
  updateDeptLocation,
  getAllDepartments,
} = require("../services/departmentService");

async function getDepartments(req, res) {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUpdatedDeptLocation(req, res) {
  try {
    const department = await updateDeptLocation();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getDepartments,
  getUpdatedDeptLocation,
};
