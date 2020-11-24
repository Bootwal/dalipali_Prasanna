exports.dashboard = (req, res) => {
  res.render("dashboard/dashboard", { layout: "dashboardLayout.hbs" });
};
