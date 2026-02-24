const {
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
} = require("../services/employeeService");

async function getEmployees(req, res) {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployee(req, res) {
  try {
    const employee = await getEmployeeByID(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesFirstNameAndEmail(req, res) {
  try {
    const employees = await selectByNameAndEmail();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithSalaryRule(req, res) {
  try {
    const employees = await selectBySalaryRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesWithHireDateRule(req, res) {
  try {
    const employees = await selectByHireDateRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTotalEmployeesCount(req, res) {
  try {
    const count = await countTotalEmployees();
    res.status(200).json({ TotalEmployees: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getHighSalEmployee(req, res) {
  try {
    const max = await highSalEmployee();
    res.status(200).json({ MaxSal: max });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAvgSalEmployee(req, res) {
  try {
    const avg = await avgSalEmployee();
    res.status(200).json({ AvgSal: avg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderedSalEmployee(req, res) {
  try {
    const employees = await selectBySalaryDesc();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getEmployeesStartWithJ(req, res) {
  try {
    const employees = await selectByfirstNameRule();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRecentHiredEmployees(req, res) {
  try {
    const employees = await selectRecentHiredEmployee();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUpdatedEmployees(req, res) {
  try {
    const employees = await updateEmployeeSal();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getEmployees,
  getEmployee,
  getEmployeesFirstNameAndEmail,
  getEmployeesWithSalaryRule,
  getEmployeesWithHireDateRule,
  getTotalEmployeesCount,
  getHighSalEmployee,
  getAvgSalEmployee,
  getOrderedSalEmployee,
  getEmployeesStartWithJ,
  getRecentHiredEmployees,
  getUpdatedEmployees,
};
