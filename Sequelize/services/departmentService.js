const { Department } = require("../models");
const { Op, Sequelize } = require("sequelize");

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

module.exports = { createDepartments, getAllDepartments, updateDeptLocation };
