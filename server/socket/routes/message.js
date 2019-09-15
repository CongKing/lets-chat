const UserModel = require('../../model/user.js')
const FriendModel = require('../../model/friend.js')
const GroupModel = require('../../model/group.js')
const SocketModel = require('../../model/socket.js')
const ChatMsgModel = require('../../model/chat-msg.js')

/**
 * 好友信息
 * @param ctx
 * @returns {Promise<*>}
 */
const sendSingleMessage = async (ctx) => {
  const {to, content} = ctx.data

  //检查是否好友关系
  const friendTo = FriendModel.findOne({to, from: ctx.socket.user})
  const friendFrom = FriendModel.findOne({to: ctx.socket.user, from: to})
  if (!friendTo || !friendFrom) return '发送失败，您跟对方不是好友关系'

  // 1. 保存 message
  const message = ChatMsgModel.create({
    from: ctx.socket.user,
    to: to,
    content
  })

  // 2. 找到对应的 socket id 并发送
  const socket = await SocketModel.findOne({user: to})
  ctx._io.to(socket.id).emit('message', message);

  return message;
}

/**
 * 群信息
 * @param ctx
 * @returns {Promise<*>}
 */
const sendGroupMessage = async (ctx) => {
  const {to, content} = ctx.data
  // TODO 发送群组消息

  // 1. 查询群组
  const group = await GroupModel.findOne({_id: to, members: {$elemMatch: ctx.socket.user}})
  if (!group) return '您不是该群的成员'

  // 2. 发送消息
  const message = ChatMsgModel.create({
    from: ctx.socket.user,
    to: to,
    content
  })
  ctx.socket.to(group.id).emit('message', message)
  return message
}


exports.sendSingleMessage = sendSingleMessage
exports.sendGroupMessage = sendGroupMessage
