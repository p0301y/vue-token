const Koa = require('koa')
const logger = require('koa-logger')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mock = require('./mock/users')
const jwt = require('./utils/token-util')
const resModel = require('./utils/res-util').resModel

const app = new Koa()
let router = new Router({
  prefix: '/api'
})

app.use(logger()) // 查看日志
app.use(bodyParser()) // 解析body
app.use(router.routes()) // 将该router对象的中间件注册到koa的实例上，后续请求的主要处理逻辑
  .use(router.allowedMethods()) // 添加针对options的响应处理，以及一些Method不支持的处理

// 钩子函数，提前获取所有的url,进行路由过滤和token校验
router.use('/*', async (ctx, next) => {
  let url = ctx.request.url
  if (url !== '/api/register' && url !== '/api/login') {
    let token = ctx.request.headers['authorization']
    // 校验token
    jwt.checkToken(token).then(() => {
      next()
    }).catch(() => {
      ctx.body = resModel({success: false, isToken: false})
    })
  } else {
    next()
  }
})

// 用户注册
router.post('/register', async (ctx) => {
  let { username, password } = ctx.request.body

  // 校验用户名是否存在
  if (mock.isExist(username)) {
    ctx.body = resModel({success: false, message: '用户已经存在'})
  } else {
    mock.addUser(username, password)
    ctx.body = resModel()
  }
})

// 用户登陆
router.post('/login', async (ctx) => {
  let { username, password } = ctx.request.body
  // 校验用户密码
  if (mock.isRight(username, password)) {
    // 返回token
    let token = jwt.createToken(username, password)
    ctx.body = resModel({token: token})
  } else {
    ctx.body = resModel({success: false, message: '用户名或密码错误'})
  }
})

// 首页
router.get('/home', async (ctx) => {
  ctx.body = resModel({content: 'welcome to home page!'})
})

app.listen(8999, () => {
  console.log('koa starts at port 8999')
})
