// -------- passport验证 -----------
// 使用passport中间件
module.exports = (app) => {

  const passport = require('koa-passport')
  app.use(passport.initialize())
  app.use(passport.session())

  // 将加密token的使用的tokenKey, 从请求中的headers中获取token的值
  const { ExtractJwt } = require('passport-jwt')
  const { tokenKey } = CONFIG.jwt
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: tokenKey,
  }

  // 使用tokenKey解密token获得原始的加密内容jwt_payload
  const { Strategy: JwtStrategy } = require('passport-jwt')
  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = jwt_payload
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }));
}
