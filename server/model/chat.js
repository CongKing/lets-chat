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
UserSchema.pre("save", function save(next) {
    const user = this

    // 更新修改时间
    if(user.isNew) {
        user.meta.createAt = new Date()
    } else {
        user.meta.updateAt = Date.now()
    }
});

// 静态方法
UserSchema.methods = {
    // TODO sendMsg receive
}

module.exports = mongoose.model('Chat', UserSchema)