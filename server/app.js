const Koa = require('koa')
const app = new Koa()
const IO = require('koa-socket-2')
const {login} = require('./socket/routes')
const {enhanceContext, route, catchError} = require('./socket/mid')

const io = new IO()
io.attach(app)

io.use(catchError())
io.use(enhanceContext())
io.use(route(
    // @ts-ignore
    app.io,
    // @ts-ignore
    app._io,
    {login},
))

app._io.on( 'connection', sock => {
    console.log('socket connected')
})

module.exports = app
