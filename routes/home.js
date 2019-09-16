const express = require('express')
const router = express.Router()
const trackerList = require('../models/tracker')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  trackerList.find({ userId: req.user._id }, (err, trackerLists) => {
    if (err) return res.status(400).send('Bad Request')
    let summary = null
    for (let i = 0; i < trackerLists.length; i++) {
      summary += +trackerLists[i].amount
    }
    return res.render('index', { trackers: trackerLists, summary: summary })
  })
})

router.get('/search', authenticated, (req, res) => {
  trackerList.find().exec((err, trackerLists) => {
    if (err) console.log(err)
    const tracker = trackerLists.filter(item =>
      item.category.toLowerCase().includes(req.query.keyword.toLowerCase())
    )
    let summary = null
    for (let i = 0; i < tracker.length; i++) {
      summary += +tracker[i].amount
    }
    return res.render('index', { trackers: tracker, summary: summary })
  })
})

module.exports = router
