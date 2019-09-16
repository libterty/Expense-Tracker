const express = require('express')
const router = express.Router()
const trackerList = require('../models/tracker')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  trackerList.find({ userId: req.user._id }, (err, trackerLists) => {
    if (err) return res.status(400).send('Bad Request')
    return res.render('index', { restaurants: trackerLists })
  })
})

module.exports = router
