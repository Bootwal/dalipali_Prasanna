"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
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
      category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      subcategory_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
