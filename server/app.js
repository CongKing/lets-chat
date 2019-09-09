const Koa = require('koa')
const app = new Koa()
const IO = require('koa-socket-2')
const {login} = require('./socket/routes/user')
const {enhanceContext, route, catchError} = require('./socket/middleware/mid')
const SocketModel = require('./model/socket')

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

app._io.on( 'connection', async (socket) => {
  // 保存连接的 socket
  SocketModel.create({
    id: socket.id,
    ip: socket.request.connection.remoteAddress
  })
  // 断开时删除
  socket.on('disconnect', async () => {
    await SocketModel.deleteOne({
      id: socket.id
    })
  })
})

module.exports = app
