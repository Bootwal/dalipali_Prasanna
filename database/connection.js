const Sequelize = require("sequelize");

const sequelize = new Sequelize("dalipali", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => console.log(error));

module.exports = sequelize;
global.sequelize = sequelize;
