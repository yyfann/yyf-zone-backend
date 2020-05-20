
module.exports = (app) => {
  const routes = [
    require("./user"),
    require("./list"),
    require("./login"),
  ];

  routes.forEach((route) => {
    app.use(route.routes(), route.allowedMethods())
  })
}
