

/**
 * ctx 增强
 */
exports.enhanceContext = () => {
    return async (ctx, next) => {
        await next()
        if(ctx.acknowledge) {
            ctx.acknowledge(ctx.res)
        }
    }
}