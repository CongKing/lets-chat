const Router = require('koa-router')
const UserModel = require('../model/user.js')
const router = new Router({
    prefix: '/user'
})

router.post('/signup', async (ctx, next) => {

    let loginData = ctx.request.body

    if(!/^1[3456789]\d{9}$/.test(loginData.mobile)) {
        // 请输入正确的手机号
        ctx.body = { code: '010', err: '请输入正确的手机号' }
        return;
    }

    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(loginData.password)) {
        // 密码至少包含英文和字母
        ctx.body = { code: '010', err: '密码至少包含英文和字母' }
        return;
    }

    if(!loginData.nickname || /^(\s)*$/.test(loginData.nickname)) {
        // 昵称不能为空
        ctx.body = { code: '010', err: '昵称不能为空' }
        return;
    }

    let user = new UserModel(loginData);
    try {
        await user.save()
    } catch (err) {
        ctx.body = { code: '010', msg: '注册失败'}    
        return
    }
    ctx.body = { code: '00000', msg: '注册成功'}
})


router.post('/login', (ctx, nuxt) => {

    let loginData = ctx.request.body
    
    if(!loginData.mobile || !loginData.password) ctx.body = {code: '010', err: '用户名密码错误'}

    UserModel.findOne({mobile: loginData.mobile}, (err, user) => {
        user.comparePassword(loginData.password, (err, isMatch) => {
            if(isMatch) {
                ctx.session.userInfo = user
                ctx.body = { code: '00000', msg: '登陆成功'}
                nuxt()
            } else {
                ctx.body = { code: '010', msg: '用户名密码错误'} 
                next()
            }
        })
    })

    // if(!ctx.session.userInfo) {
    //     // 查询用户数据， 比对用户名密码,
    //     // 比对成功， 将数据存在session，返回成功
    //     // 失败，返回失败结果
    //     let userInfo = ctx.request.body
    //     console.log(userInfo)
    //     ctx.session.userInfo = userInfo
    //     ctx.body = {code: '00000', msg : 'ok'}
    // } else {
    //     console.log('already login')
    //     console.log(ctx.session.userInfo)
    // }
    
})


module.exports = router