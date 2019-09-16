const express = require('express')
const router = express.Router()
const trackerList = require('../models/tracker')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  trackerList.find({ userId: req.user._id }, (err, trackerLists) => {
    if (err) return res.status(400).send('Bad Request')
    return res.render('index', { trackers: trackerLists })
  })
})

router.get('/search', authenticated, (req, res) => {
  trackerList.find().exec((err, trackerLists) => {
    if (err) console.log(err)
    console.log(req)
    const tracker = trackerLists.filter(item =>
      item.category.toLowerCase().includes(req.query.keyword.toLowerCase())
    )
    return res.render('index', { trackers: tracker })
  })
})

module.exports = router
