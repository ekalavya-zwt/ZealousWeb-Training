const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");

router.get("/", controller.getDepartments);
// router.get("/", controller.getUpdatedDeptLocation);

module.exports = router;
