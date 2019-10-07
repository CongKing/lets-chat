const Koa = require('koa')
const app = new Koa()
const IO = require('koa-socket-2')
const userRoutes = require('./socket/routes/user')
const messageRoutes = require('./socket/routes/message')
const commonRoutes = require('./socket/routes/common')
const chattingRouter = require('./socket/routes/chat-msg.js')
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
  {...userRoutes, ...messageRoutes, ...commonRoutes, ...chattingRouter}
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
