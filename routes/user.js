const router = require('koa-router')()


const Person = require('../db/models/person')

router.prefix('/users')

// 增加
router.post('/addPerson', async function(ctx){
  // 从post请求中读取name, age
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  })

  // 将实例保存, tip: 正常需要容错处理
  await person.save()
  ctx.body = {
    code: 200,
  }
})
// curl -d 'name=lijian&age=16' http://localhost:3000/users/addPerson

// 查询
router.get('/getPerson', async function (ctx, next) {
  let search = {
    name: ctx.request.query.name
  }

  search = _.pickBy(search, val => !_.isNil(val))

  const data = await Person.find(search)
  ctx.body = {
    code: 200,
    data,
  }
})
// curl http://localhost:3000/users/getPerson?name=lijian
// curl http://localhost:3000/users/getPerson

// 编辑
router.post('/updatePerson', async function (ctx, next) {
  const res = await Person.where({name: ctx.request.body.name})
    .update({
      age: ctx.request.body.age
    })
  ctx.body = {code: 200}
})
// curl -d 'name=lijian&age=19' http://localhost:3000/users/updatePerson


// 删除
router.post('/removePerson', async function (ctx, next) {
  console.log(ctx.request,'ctx.request')
  console.log(ctx.request.body._id,'ctx.request.body._id')
  await Person.where({_id: ctx.request.body._id})
    .remove()
  ctx.body = {code: 200,}
})
// curl -d 'name=lijian&' http://localhost:3000/users/removePerson





module.exports = router
