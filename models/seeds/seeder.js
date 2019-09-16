const mongoose = require('mongoose')
const trackerList = require('../tracker')
const trackers = require('./trackers').results
const User = require('../user')
const user = require('./users.json')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1/tracker', {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  user.forEach(user => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.error(err)
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser
          .save()
          .then(users => {
            for (let j = user.tracker[0] - 1; j < user.tracker[11]; j++) {
              trackerList.create({
                name: trackers[j].name,
                category: trackers[j].category,
                date: trackers[j].date,
                amount: trackers[j].amount,
                userId: users._id
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
  })

  console.log('done')
})
