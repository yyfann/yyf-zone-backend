const Koa = require('koa')
const app = new Koa()

// 全局变量
require('./plugins/global-varies')

// 跨域
const cors = require("koa2-cors");
app.use(cors({
  // 允许cookie
  credentials: true,
}));

// 根据运行环境选择配置
const env = process.env.NODE_ENV || 'dev'
global.CONFIG = require(`./config/${env}`)


// error handler
const onerror = require("koa-onerror");
onerror(app)

// middlewares
const bodyparser = require("koa-bodyparser");
app.use(bodyparser({
  strict: false,
  enableTypes: ['json', 'form', 'text']
}))
const json = require("koa-json");
app.use(json())
const logger = require("koa-logger");
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 数据库
const mongoose = require('mongoose')
mongoose.connect(CONFIG.db, {
  useNewUrlParser: true,
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// jwt token (passport)
require('./plugins/passport')(app)

// routes
require('./routes/index')(app)

module.exports = app
