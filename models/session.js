const Sequelize = require("sequelize");
const sequelize = new Sequelize("dalipali", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000),
});
