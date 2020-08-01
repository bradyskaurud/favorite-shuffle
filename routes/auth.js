const express = require('express');
const Spotify = require('../components/spotify');
const router = express.Router();

/* GET home page. */
router.get('/authorize', function(req, res, next) {
  const authorizeUrl = Spotify.getAuthorizeUrl();
  res.redirect(authorizeUrl)
});

router.get('/spotify/callback', async (req, res, next) => {
  console.log('made it to the callback');
  const { code } = req.query || {};

  const response = await Spotify.authorizationCodeGrant(code);

  const { access_token: accessToken, refresh_token: refreshToken }  = (response && response.body) || {};

  Spotify.setAccessToken(accessToken);
  Spotify.setRefreshToken(refreshToken);

  res.render('auth', { token: accessToken });
});

module.exports = router;
