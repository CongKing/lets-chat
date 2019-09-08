const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    name: {
      type: String,
      trim: true,
      unique: true,
      match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
      index: true,
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastMsg: { // TODO msg schema
        type: Schema.Types.ObjectId,
        ref: 'ChatMsg'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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
GroupSchema.pre("save", function save(next) {
    const user = this

    // 更新修改时间
    if(user.isNew) {
        user.meta.createAt = new Date()
    } else {
        user.meta.updateAt = Date.now()
    }
});

// 静态方法
GroupSchema.methods = {
    // TODO sendMsg receive
}

module.exports = mongoose.model('Group', GroupSchema)
