const Router = require('koa-router')
const router = new Router()
const User = require('../db/models/user')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')


router.prefix('/users')

// 注册接口
router.post('/register', async function (ctx) {
  // 查询是否注册过
  const users = await User.find({ username: ctx.request.body.username })
  // 注册过
  if (users.length > 0) {
    ctx.body = {
      code: 500,
      msg: '用户名被占用了',
    }
    // 没注册过
  } else {
    // 创建一个用户数据
    const newUser = new User({
      username: ctx.request.body.username,
      password: ctx.request.body.password,
    })

    // 将用户存在数据库
    const data = await newUser.save()
    ctx.body = {
      code: 200,
      msg: '注册成功!!',
      data,
    }
  }
})

// 登陆接口
router.post('/login', async function (ctx) {
  const user = await User.findOne({ username: ctx.request.body.username })

  if (!user) {
    ctx.body = {
      code: 404,
      msg: '用户不存在',
    }
  } else {
    if (ctx.request.body.password === user.password) {
      // 将用户名, 处理成一个token字符串
      const payload = {
        _id: user._id,
        username: user.username,
      }

      const { tokenKey } = CONFIG.jwt
      // 前面必须加上 Bearer空格, 该token才有效
      const token = 'Bearer ' + jwt.sign(payload, tokenKey, {
        // 过期时间
        expiresIn: 100000,
      })

      // 将token返回
      
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          token,
        }
      }
    } else {
      
      ctx.body = {
        code: 400,
        msg: '密码错误',
      }
    }
  }
})



// 获取用户信息
// 需要在用户登录的情况下, 并且token没过期
router.get('/getUser',
  passport.authenticate('jwt', { session: false }),
  async function (ctx) {

    // 通过一个id找用户
    const user = await User.findById(ctx.state.user._id)
    ctx.body = {
      code: 200,
      data: user
    }
  }
)



module.exports = router
