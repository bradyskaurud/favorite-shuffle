const express = require('express');
const Spotify = require('../components/spotify');
const db = require('../models/index.js');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const users = await db.User.findAll();
  res.json(users);
});

module.exports = router;
