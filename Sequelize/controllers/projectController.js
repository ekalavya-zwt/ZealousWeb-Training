const { eagerLoadingQueries } = require("../services/projectService");

async function practicingEagerLoadingQueries(req, res) {
  try {
    const departments = await eagerLoadingQueries();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  practicingEagerLoadingQueries,
};
