const Koa = require('koa')
const session = require('koa-session')
const json = require('koa-json')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
const userControl = require('./controller/user-control')
const commonControl = require('./controller/index')

const moogoose = require('mongoose')
const koaBody = require('koa-body')
const {authFilter} = require('./mid/auth')
const {errorCatcher} = require('./mid/handle-err')

const db = moogoose.connect('mongodb://127.0.0.1:27017/letschat', (err) => {
  if(err) throw err
  console.log('连接成功')
})

app.keys = ['lets-chat']
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

app.use(session(CONFIG, app))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(koaBody())
  app.use(json())
  
  // 错误处理
  app.use(errorCatcher)
  app.use(authFilter)

  // 路由
  app.use(userControl.routes()).use(userControl.allowedMethods())
  app.use(commonControl.routes()).use(commonControl.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
