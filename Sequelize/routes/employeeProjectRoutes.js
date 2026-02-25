const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeProjectController");

router.get("/", controller.getEmployeeProjects);
// router.get("/", controller.getIncrementedHoursWorked);
// router.get("/", controller.getEmployeeProjectsWithAnalyticsQueries);

module.exports = router;
