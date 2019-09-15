const jwt = require('jsonwebtoken')
const UserModel = require('../../model/user.js')
const FriendModel = require('../../model/friend.js')
const GroupModel = require('../../model/group.js')
const SocketModel = require('../../model/socket.js')
const RequestModel = require('../../model/request.js')
const TokenExpiresTime = 1000 * 60 * 60 * 24 * 7
const TokenSecret = 'shhhhh'

/**
 * 登陆
 * @param ctx
 * @returns {Promise<*>}
 */
const login = async (ctx) => {
  const {mobile, password} = ctx.data;
  // 1. 查询用户
  let user = await findUserByMobile(mobile);
  if (!user) return '找不到用户'

  let isMatch = await user.comparePassword(password);
  if (!isMatch) return '用户名密码错误'

  // 2. 查询好友
  const friends = await FriendModel.find({from: user._id}).populate('to', {
    _id: 1,
    avatar: 1,
    nickname: 1
  })

  // 3. 查询群组 监听群组消息
  const groups = await GroupModel.find({members: user},
    {
      _id: 1,
      name: 1,
      avatar: 1,
      owner: 1
    }).populate('lastMsg', {
      from: 1,
      content: 1,
      createdAt: 1
    })
  groups.forEach((group) => {
    ctx.socket.join(group.id.toString())
  })

  // 4. 生成token
  let token = jwt.sign({
    exp: Date.now() + TokenExpiresTime,
    data: {
      _id: user._id,
      mobile
    }
  }, TokenSecret)

  ctx.socket.user = user._id
  await SocketModel.updateOne(
    {id: ctx.socket.id},
    {
      user: user._id
    })

  return {
    token,
    friends,
    groups,
    _id: user._id,
    avatar: user.avatar,
    nickname: user.nickname
  }
}

/**
 * token 登陆
 * @param ctx
 * @returns {Promise<*>}
 */
const loginByToken = async (ctx) => {
  let {token} = ctx.data
  if(!token) return '无效的token'

  let rawData = null
  try {
    rawData = await jwt.verify(token, TokenSecret)
  } catch (err) {
    throw Error(err)
  }
  const user = await UserModel.findOne({mobile: rawData.data.mobile, _id: rawData.data._id})
  if(!user) return '无效的token'

  // 查询好友
  const friends = await FriendModel.find({from: user._id}).populate('to', {
    _id: 1,
    avatar: 1,
    nickname: 1
  })

  // 查询群组
  const groups = await GroupModel.find({members: user},
    {
      _id: 1,
      name: 1,
      avatar: 1,
      owner: 1
    }).populate('lastMsg', {
    from: 1,
    content: 1,
    createdAt: 1
  })

  // 计算token
  token = jwt.sign({
    exp: Date.now() + TokenExpiresTime,
    data: {
      _id: user._id,
      mobile: user.mobile
    }
  }, TokenSecret)

  // 设置登陆凭证
  ctx.socket.user = user._id
  await SocketModel.updateOne(
    {id: ctx.socket.user},
    {
      user: user._id
    })

  return {
    token,
    friends,
    groups,
    _id: user._id,
    avatar: user.avatar,
    nickname: user.nickname
  }
}

const findUserByMobile = (mobile) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({mobile}, (msg, user) => {
      if(msg) {
        reject(msg)
        return
      }
      resolve(user)
    })
  })
}

/**
 * 注册
 * @param ctx
 * @returns {Promise<*>}
 */
const register = async (ctx) => {
  const {mobile, avatar, nickname, password} = ctx.data

  if(!/^1[3456789]\d{9}$/.test(mobile)) return '请输入正确的手机号'
  if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(password)) return '密码须同时包含英文和字母'
  if(!nickname || /\s/.test(nickname)) return '昵称不能为空'

  let user = await findUserByMobile(mobile)
  if(user) return '手机号已经被注册'

  user = new UserModel({mobile, avatar, nickname, password})

  await user.save()

  let token = jwt.sign({
    exp: Date.now() + TokenExpiresTime,
    data: {
      _id: user._id,
      mobile
    }
  }, TokenSecret)

  ctx.socket.user = user._id;
  return {
    token,
    friends: [],
    groups: [],
    _id: user._id,
    avatar: user.avatar,
    nickname: user.nickname
  }
}

const findUsers = async (ctx) => {
  const {value} = ctx.data
  if (!value) return '找不到用户'

  let users = await UserModel.find({
    $or: [
      {mobile: {$regex : new RegExp(value, 'i')}},
      {mobile: {$regex : new RegExp(value, 'i')}}
      ]
  }, {
    _id: 1,
    mobile: 1,
    avatar: 1,
    nickname: 1,
  })
  return {users}
}

/**
 * 发送好友请求
 * @param ctx
 * @returns {Promise<*>}
 */
const addFriendRequest = async (ctx) => {
  let {userId} = ctx.data

  let user = await UserModel.findOne({_id: userId})
  if(!user) '用户不存在'

  let request = await RequestModel.create({
    from: ctx.socket.user,
    to: user._id
  })

  const socket = await SocketModel.findOne({user: userId})
  ctx._io.to(socket.id).emit('message', '您有新的好友请求，請及时处理')

  return request
}

const handleRequest = async (ctx) => {
  const {from, to, status} = ctx.data
  const request = RequestModel.findOneAndUpdate({from, to},{
    status: status
  })
  if(!request) return '请求已经失效'

  if(status === 'accept') {
    FriendModel.create({from, to,})
    FriendModel.create({from: to, to: from,})
    const socket = await SocketModel.findOne({user: from})
    ctx._io.to(socket.id).emit('message', '您的好友申请已经通过')
  }
  return request
}

/**
 * 添加好友
 * @param ctx
 * @returns {Promise<*>}
 */
const addFriend = async (ctx) => {
  const {userId} = ctx.data
  if (userId) return '无效的id'

  const user = UserModel.findOne({_id: userId})
  if(!user) return '添加失败，找不到此用户'

  const friend = FriendModel.findOne({from: ctx.socket.user, to: userId})
  if(friend) return '你们已经是好友了'

  const friendToAdd = FriendModel.create({
    from: ctx.socket.user,
    to: userId
  })

  return {
    _id: user._id,
    nickname: user.nickname,
    avatar: friendToAdd.avatar,
    from: friendToAdd.from,
    to: friendToAdd.to
  }
}

/**
 * 删除好友
 * @param ctx
 * @returns {Promise<*>}
 */
const deleteFriend = async (ctx) => {
  const userId = ctx.data
  if (userId) return '无效的id'

  const user = UserModel.findOne({_id: userId})
  if(!user) return '添加失败，找不到此用户'

  await FriendModel.deleteOne({from: ctx.socket.user, to: userId})
  return {}
}

exports.login = login
exports.loginByToken = loginByToken
exports.register = register
exports.addFriend = addFriend
exports.deleteFriend = deleteFriend
exports.findUsers = findUsers
exports.addFriendRequest = addFriendRequest
exports.handleRequest = handleRequest



