const jwt = require('jsonwebtoken')
const UserModel = require('../model/user.js')
const FriendModel = require('../model/friend.js')
const GroupModel = require('../model/group.js')
const TokenExpiresTime = 1000 * 60 * 60 * 24 * 7
const TokenSecret = 'shhhhh'

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

  // 3. 查询群组
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

  // 4. 生成token
  let token = jwt.sign({
    exp: Date.now() + TokenExpiresTime,
    data: {
      _id: user._id,
      mobile
    }
  }, TokenSecret)

  ctx.socket.user = user._id
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


const register = async (ctx) => {
  const {mobile, avatar, nickname, password} = ctx.data

  if(!/^1[3456789]\d{9}$/.test(loginData.mobile)) return '请输入正确的手机号'
  if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(loginData.password)) return '密码须同时包含英文和字母'
  if(!loginData.nickname || /\s/.test(loginData.nickname)) return '昵称不能为空'

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

exports.login = login
