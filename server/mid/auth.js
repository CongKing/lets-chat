const allowGetPath = ['/login', '/signup', '/']
const allowPostPath = ['/user/login', '/user/signup']

exports.authFilter = async (ctx, next) => {
    
    let url = ctx.originalUrl
    let method = ctx.method.toLowerCase()
    let hasSession = !!ctx.session.userInfo
    
    switch (method) {
        case 'get':
            if (/(.js|.css|.png|.jpeg|.jpg)$/.test(url)) return await next()
            if (hasSession) {
                // 已经登陆
                if(url === '/login') { 
                    // 如果已经登陆，login 页面直接跳转至首页
                    ctx.redirect('/home')
                    return
                }
            } else {
                // 未登陆
                if(allowGetPath.indexOf(url) > -1) return await next() // 如果是登陆注册页面
                ctx.redirect('/login')
                return
            }
            break

        case 'post':
            if(!hasSession) {
                // 未登录
                if(allowPostPath.indexOf(url) > -1) {
                    return await next()
                } else {
                    ctx.redirect('/auth-failed')
                    return
                }
            }
            break
        default:
    }
    await next()
}