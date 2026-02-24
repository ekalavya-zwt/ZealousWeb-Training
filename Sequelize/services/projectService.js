const { Project } = require("../models");

async function createProjects(projects) {
  await Project.bulkCreate(projects, { validate: true });
}

module.exports = { createProjects };
