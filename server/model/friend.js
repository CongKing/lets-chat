const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastMsg: {
    type: Schema.Types.ObjectId,
    ref: 'ChatMsg'
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

FriendSchema.pre('save', function() {
  if (this.isNew) {
    this.createAt = Date.now()
  }
})

module.exports = mongoose.model('Friend', FriendSchema)
