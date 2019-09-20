const mongoose = require('mongoose')
const Schema = mongoose.Schema
const d = new Date()

const trackerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: () =>
      d.getMonth() < 10
        ? `${d.getFullYear()}/0${d.getMonth()}/${d.getDate()}`
        : `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`,
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('tracker', trackerSchema)
