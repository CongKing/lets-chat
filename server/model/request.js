const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  read: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

RequestSchema.pre('save', function() {
  if (this.isNew) {
    this.createAt = Date.now()
    this.status = 'pending'
    this.read = false
  }
})

module.exports = mongoose.model('Request', RequestSchema)
