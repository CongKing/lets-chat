const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    lastMsg: { // TODO msg schema
        type: Schema.Types.ObjectId,
        ref: 'ChatMsg',
        default: ''
    },
    from: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    to: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    activated: {
      type: Boolean,
      default: false,
    },
    stick: {
      type: Boolean,
      default: false
    },
    mute: {
      type: Boolean,
      default: false
    },
    meta:{
        createdAt: {
            type:Date,
            default:Date.now()
        },
        updateAt: {
            type:Date,
            default:Date.now()
        }
    }
})

// save 前处理
ChatSchema.pre("save", function save(next) {
    const user = this

    // 更新修改时间
    if(user.isNew) {
        user.meta.createAt = new Date()
    } else {
        user.meta.updateAt = Date.now()
    }
});

// 静态方法
ChatSchema.methods = {
    // TODO sendMsg receive
}

module.exports = mongoose.model('Chat', ChatSchema)
