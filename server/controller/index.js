const Router = require('koa-router')

const router = new Router()

router.post('auth-failed', (ctx) => {
    ctx.body = {code: '001', msg: '请登陆...'}
    ctx.redirect('/login')
})

module.exports = router