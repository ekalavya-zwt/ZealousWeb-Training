const { Department } = require("../models");

async function createDepartments(departments) {
  await Department.bulkCreate(departments, { validate: true });
}

module.exports = { createDepartments };
