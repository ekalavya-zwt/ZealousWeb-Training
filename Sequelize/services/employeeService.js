const { Employee } = require("../models");
const { Op, Sequelize } = require("sequelize");

async function createEmployees(employees) {
  await Employee.bulkCreate(employees, { validate: true });
}

async function createEmployee(employee) {
  await Employee.create(employee);
}

async function getAllEmployees() {
  return await Employee.findAll();
}

async function getEmployeeByID(id) {
  return await Employee.findByPk(id);
}

async function selectByNameAndEmail() {
  return await Employee.findAll({
    attributes: ["firstName", "email"],
  });
}

async function selectBySalaryRule() {
  return await Employee.findAll({
    where: { salary: { [Op.gt]: 70000 } },
  });
}

async function selectByHireDateRule() {
  return await Employee.findAll({
    where: { hireDate: { [Op.gt]: "2023-01-01" } },
  });
}

async function countTotalEmployees() {
  return await Employee.count();
}

async function highSalEmployee() {
  return await Employee.max("salary");
}

async function avgSalEmployee() {
  return await Employee.avg("salary");
}

async function selectBySalaryDesc() {
  return await Employee.findAll({
    order: [["salary", "DESC"]],
  });
}

async function selectByfirstNameRule() {
  return await Employee.findAll({
    where: {
      firstName: { [Op.like]: "J%" },
    },
  });
}

async function selectRecentHiredEmployee() {
  return await Employee.findAll({
    order: [["hireDate", "DESC"]],
    limit: 3,
  });
}

async function updateEmployeeSal() {
  await Employee.update(
    {
      salary: Sequelize.literal("salary * 1.1"),
    },
    { where: {} },
  );

  return await Employee.findAll();
}

module.exports = {
  createEmployees,
  createEmployee,
  getAllEmployees,
  getEmployeeByID,
  selectByNameAndEmail,
  selectBySalaryRule,
  selectByHireDateRule,
  countTotalEmployees,
  highSalEmployee,
  avgSalEmployee,
  selectBySalaryDesc,
  selectByfirstNameRule,
  selectRecentHiredEmployee,
  updateEmployeeSal,
};
