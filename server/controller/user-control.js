const Router = require('koa-router')
const UserModel = require('../model/user.js')
const router = new Router({
    prefix: '/user'
})

router.post('/signup', async (ctx, next) => {

    let loginData = ctx.request.body

    if(!/^1[3456789]\d{9}$/.test(loginData.mobile)) {
        // 请输入正确的手机号
        ctx.body = { code: '010', msg: '请输入正确的手机号' }
        return;
    }

    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(loginData.password)) {
        // 密码至少包含英文和字母
        ctx.body = { code: '010', msg: '密码须同时包含英文和字母' }
        return;
    }

    if(!loginData.nickname || /\s/.test(loginData.nickname)) {
        // 昵称不能为空
        ctx.body = { code: '010', msg: '昵称不能为空' }
        return;
    }

    let user = new UserModel(loginData);
    try {
        await user.save()
    } catch (msg) {
        ctx.body = { code: '010', msg: '注册失败'}    
        return
    }
    ctx.body = { code: '00000', msg: '注册成功'}
})


router.post('/login', async (ctx, nuxt) => {

    let loginData = ctx.request.body

    if(!loginData.mobile || !loginData.password) ctx.body = {code: '010', msg: '用户名密码错误'}
    
    try {
        let user = await findUserByMobile(loginData.mobile);
        if (!user) {
            ctx.body = {code: '010', msg: '找不到用户'}
            return
        }
        let isMatch = await user.comparePassword(loginData.password);    
        if (!isMatch) {
            ctx.body = {code: '010', msg: '用户名密码错误'}
        } else {
            ctx.session.userInfo = user
            ctx.body = {code: '00000', msg: '登陆成功'}
        }
    } catch (msg) {
        ctx.body = {code: '010', msg: '登陆失败'}
    }
})

const findUserByMobile = (mobile) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({mobile}, (msg, user) => {
            if(msg) {
                reject(msg)
                return
            }
            resolve(user)
        })
    })   
}

router.post('/contacts', async (ctx) => {
    if(!ctx.session.userInfo) {
        ctx.body = {code: '010', msg: '没有登陆'}
        return
    }
    let {err, data} = await getContacts(ctx.session.userInfo.mobile)
    if(err) ctx.body = {code: '010', msg: '查询失败'}
    ctx.body = {code: '00000', data}
})


router.get('/logout', async (ctx) => {
    ctx.session.userInfo = null
    ctx.redirect('/login')
})

const getContacts = (mobile) => {
    return new Promise((resolve, reject) => {
        UserModel.find({mobile: {$ne: mobile}}, (err, users) => {
            if(err) {
                resolve(err)
                return
            }
            resolve({data: users})
        })
    })   
}

module.exports = router
