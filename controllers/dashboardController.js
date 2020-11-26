const Category = require("../models/category");

function dashboardController() {
  return {
    //controller  here
    dashboard(req, res) {
      res.render("dashboard/dashboard", { layout: "dashboardLayout.hbs" });
    },
    category(req, res) {
      res.render("dashboard/category", { layout: "dashboardLayout.hbs" });
    },
    addCategory(req, res) {
      const category_name = req.body.category_name;
      const brandName = req.body.brandName;
      Category.findAll({ where: { category_name: category_name } })
        .then((result) => {
          if (result.length > 0) {
            Category.findAll({
              order: [["position", "ASC"]],
            }).then(categories);
          }
        })
        .catch((error) => console.log(error));
    },
  };
}

module.exports = dashboardController;
