const Sequelize = require("sequelize");
const sequelize = new Sequelize("dalipali", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize.define("Order", {
  order_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  delivery_date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  },
});
