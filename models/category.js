const Sequelize = require("sequelize");
const sequelize = new Sequelize("dalipali", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize.define("Category", {
  product_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  weight: {
    type: Sequelize.STRING,
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category_id: {},
});
