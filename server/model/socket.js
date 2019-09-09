const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SocketSchema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    index: true
  },
  ip: String,
  os: {
    type: String,
    default: ''
  },
  browser: {
    type: String,
    default: ''
  },
  environment: {
    type: String,
    default: ''
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Socket', SocketSchema)
