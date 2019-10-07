const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatMsgSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: String,
        index: true,
        ref: 'User'
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// save 前处理
ChatMsgSchema.pre("save", function (next) {
    const msg = this
    // 保存时间
    if(msg.isNew) {
        msg.createAt = new Date()
    }
    next()
})

module.exports = mongoose.model('ChatMsg', ChatMsgSchema)
