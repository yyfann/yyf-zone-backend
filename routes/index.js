
module.exports = (app) => {
  const routes = [
    require("./user"),
    require("./list"),
  ];

  routes.forEach((route) => {
    app.use(route.routes(), route.allowedMethods())
  })
}
