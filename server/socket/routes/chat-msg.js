const ChatMsgModel = require('../../model/chat-msg')
const ChatModel = require('../../model/chat')
const SocketModel = require('../../model/socket')
const UserModel = require('../../model/user')

/**
 * 查询历史记录
 * @param ctx
 * @returns {Promise<*>}
 */
const getChattingHistory = async (ctx) => {
  let {id} = ctx.data

  if(!id) return '找不到用户'

  let to = await UserModel.findOne({_id: id}, 'nickname avatar mobile')

  let history = await ChatMsgModel.find({$or: [{from: ctx.socket.user, to: id}, {from: id, to: ctx.socket.user}]}).populate('to', {
    nickname: '1',
    avatar: '1',
    mobile: '1'
  }).sort({'createdAt':1})

  await ChatModel.findOneAndUpdate({from: ctx.socket.user, to: id}, {unread: 0})
  return {to, history}
}

/**
 * 发送消息
 * @param ctx
 * @returns {Promise<*>}
 */
const sendMsg = async (ctx) => {
  const {id, content} = ctx.data
  const from = ctx.socket.user
  const chattingMessage = await ChatMsgModel.create({
    to: id,
    from,
    content
  })
  // 未读 +1
  await ChatModel.where({to: from, from: id}).update({$inc: {unread: 1}, lastMsg: chattingMessage._id})
  const socket = await SocketModel.findOne({user: id})
  if (socket) {
    ctx._io.to(socket.id).emit('chatting-message', chattingMessage)
  }
  return chattingMessage
}

module.exports.getChattingHistory = getChattingHistory
module.exports.sendMsg = sendMsg
