const allowGetPath = ['/login', '/signup', '/']
const allowPostPath = ['/user/login', '/user/signup']

exports.authFilter = async (ctx, next) => {
    
    let url = ctx.originalUrl
    
    if(/(.js|.css|.png|.jpeg|.jpg)$/.test(url)) {
        await next()
        return
    }

    if (ctx.method.toLowerCase() === 'get' && url === '/login' && ctx.session.userInfo) {
        ctx.redirect('/home')
        await next()
        return
    }

    if(ctx.method.toLowerCase() === 'get' && allowGetPath.indexOf(url) > -1) {
        await next()
        return
    }

    if(ctx.method.toLowerCase() === 'post' && allowPostPath.indexOf(url) > -1) {
        await next()
        return
    }

    if (ctx.method.toLowerCase() === 'get' && !ctx.session.userInfo) {
        ctx.redirect('/login')
    }

    if (ctx.method.toLowerCase() === 'post' && !ctx.session.userInfo) {
        ctx.redirect('/auth-failed')
    }

    await next()
}