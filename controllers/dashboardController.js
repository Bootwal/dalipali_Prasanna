const Category = require("../models/category");
const Brand = require("../models/brand");
const db = require("../database/connection");

function dashboardController() {
  return {
    //controller  here
    dashboard(req, res) {
      res.render("dashboard/dashboard", { layout: "dashboardLayout.hbs" });
    },

    //rendering category in dashboard
    category(req, res) {
      res.render("dashboard/category", { layout: "dashboardLayout.hbs" });
    },

    //adding category with brands
    addCategory(req, res) {
      const category_name = req.body.category_name;
      const brandName = req.body.brandName;
      Category.findAll({ where: { category_name: category_name } })
        .then((result) => {
          if (result.length > 0) {
            Category.findAll({
              order: [["position", "ASC"]],
            })
              .then((categories) => {
                res.render("partials/categoryPartials");
              })
              .catch((error) => console.log(error));
          } else {
            db.beginTransaction((error) => {
              if (error) throw error;
              Category.create({
                where: {
                  category_name: category_name,
                },
              })
                .catch((error) => {
                  db.rollback((error) => {
                    throw error;
                  });
                })
                .then((category) => {
                  var category_id = category.insertId;
                  for (var i = 0; i < brandName.length; i++) {
                    Brand.create({
                      where: {
                        brand_name: brandName,
                        category_id: category_id,
                      },
                    })
                      .catch((error) => {
                        db.rollback((error) => {
                          throw error;
                        });
                      })
                      .then(() => {
                        db.commit((error) => {
                          if (error) {
                            db.rollback(() => {
                              throw error;
                            });
                          }
                        });
                      });
                  }
                });

              Category.findAll({
                order: [["position", "ASC"]],
              })
                .then((categories) => {
                  res.render("partials/categoryPartials");
                })
                .catch((error) => console.log(error));
            });
          }
        })
        .catch((error) => console.log(error));
    },
  };
}

module.exports = dashboardController;
