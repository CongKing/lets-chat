
/**
 * socket 登陆拦截
 */
exports.loginFilter = () => {
    let allowMethods = []
    return async (ctx, next) => {
        console.log(ctx.session.user)
        // if (allowMethods.indexOf(ctx.event) < 0 && !ctx.socket.user) {
        //     ctx.res = '请登录后再试'
        //     return
        // }
        await next()
    }
}