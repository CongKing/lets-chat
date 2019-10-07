const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    lastMsg: { // TODO msg schema
        type: Schema.Types.ObjectId,
        ref: 'ChatMsg'
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
    unread: {
      type: Number,
      default: 0
    },
    meta:{
        createdAt: {
            type:Date,
            default: Date.now()
        },
        updateAt: {
            type:Date,
            default: Date.now()
        }
    }
})

// save 前处理
ChatSchema.pre("save", function save(next) {
    const chat = this

    // 更新修改时间
    if(chat.isNew) {
      chat.meta.createAt = Date.now()
    } else {
      chat.meta.updateAt = Date.now()
    }
    next();
});

// 静态方法
ChatSchema.methods = {
    // TODO sendMsg receive
}

module.exports = mongoose.model('Chat', ChatSchema)
