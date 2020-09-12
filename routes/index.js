const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const routes = [
  require('./auth.js'),
  require('./oauth_connections.js'),
  require('./spotify.js'),
  require('./users'),
];

routes.forEach((route) => route(router));

module.exports = router;
