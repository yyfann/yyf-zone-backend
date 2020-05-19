const router = require('koa-router')()


router.get("/list", function (ctx, next) {

  const data = _.range(1, 5).map(i => ({
    value: i,
    label: `条目${i}`,
  }))
  ctx.body = {
    code: 200,
    data,
  }
});





module.exports = router
