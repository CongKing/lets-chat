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
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Friend', FriendSchema)
