const express = require('express');
const Spotify = require('../components/spotify');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('welcome!');

  res.render('')
});

module.exports = router;
