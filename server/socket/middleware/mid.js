const assert = require('assert')

const enhanceContext = () => {
    return async (ctx, next) => {
        await next()
        if (ctx.acknowledge) {
            ctx.acknowledge(ctx.res)
        }
    }
}

/**
 * 路由
 * @param io
 * @param _io
 * @param routes
 * @returns {function(*)}
 */
const route = (io, _io, routes) => {
    // 1 注册一个空的事件
    Object.keys(routes).forEach((routeName) => {
        io.on(routeName, () => ({}))
    })

    // 2 每个空的事件可以通过 ctx.event 从 routes 获得对应的 callback 方法
    return async (ctx) => {
        if(!routes[ctx.event]) return
        const { event, data, socket } = ctx
        ctx.res = await routes[ctx.event]({
            event, // 事件名
            data, // 请求数据
            socket, // 用户socket实例
            io, // koa-socket实例
            _io, // socket.io实例
            });
    }
}

/**
 * 错误拦截
 * @returns {function(*, *)}
 */
const catchError =  () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof assert.AssertionError) {
        ctx.res = err.message;
        return;
      }
      ctx.res = `Server Error: ${err.message}`;
      console.error('Unhandled Error\n', err);
    }
  };
}

exports.enhanceContext = enhanceContext
exports.route = route
exports.catchError = catchError
