const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

// router.get("/", controller.getEmployees);
// router.get("/:id", controller.getEmployee);
// router.get("/", controller.getEmployeesFirstNameAndEmail);
// router.get("/", controller.getEmployeesWithSalaryRule);
// router.get("/", controller.getHighSalEmployee);
// router.get("/", controller.getAvgSalEmployee);
// router.get("/", controller.getOrderedSalEmployee);
// router.get("/", controller.getEmployeesStartWithJ);
// router.get("/", controller.getRecentHiredEmployees);
router.get("/", controller.getUpdatedEmployees);

module.exports = router;
