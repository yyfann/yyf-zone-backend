const router = require('koa-router')()


const User = require('../db/models/user')

router.prefix('/users')

// 增加
router.post('/addPerson', async function(ctx){
  // 从post请求中读取name, password
  const person = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password,
  })

  // 将实例保存, tip: 正常需要容错处理
  await person.save()
  ctx.body = {
    code: 200,
  }
})
// curl -d 'username=lijian&password=16' http://localhost:3000/users/addPerson

// 查询
router.get('/getPerson', async function (ctx, next) {
  let search = {
    username: ctx.request.query.username
  }

  search = _.pickBy(search, val => !_.isNil(val))

  const data = await User.find(search)
  ctx.body = {
    code: 200,
    data,
  }
})
// curl http://localhost:3000/users/getPerson?username=lijian
// curl http://localhost:3000/users/getPerson

// 编辑
router.post('/updatePerson', async function (ctx, next) {
  const res = await User.where({username: ctx.request.body.username})
    .update({
      password: ctx.request.body.password
    })
  ctx.body = {code: 200}
})
// curl -d 'username=lijian&password=19' http://localhost:3000/users/updatePerson


// 删除
router.post('/removePerson', async function (ctx, next) {
  console.log(ctx.request,'ctx.request')
  console.log(ctx.request.body._id,'ctx.request.body._id')
  await User.where({_id: ctx.request.body._id})
    .remove()
  ctx.body = {code: 200,}
})
// curl -d 'username=lijian&' http://localhost:3000/users/removePerson





module.exports = router
