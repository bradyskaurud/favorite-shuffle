const express = require('express');
const Spotify = require('../components/spotify');
const db = require('../models/index.js');
const router = express.Router();

/* GET home page. */
router.get('/authorize', async function(req, res, next) {
  await db.User.create({ firstName: 'Brady', lastName: 'S', email: 'bradyskaurud@gmail.com', password: 'Password987' });

  const authorizeUrl = Spotify.getAuthorizeUrl();
  res.json({authorizeUrl});
});

router.get('/spotify/callback', async (req, res, next) => {
  console.log('made it to the callback');
  const { code } = req.query || {};

  const response = await Spotify.authorizationCodeGrant(code);

  const { access_token: accessToken, refresh_token: refreshToken, expires_in: expires }  = (response && response.body) || {};

  const user = await db.User.findOne(
    {
      where: {
        email: 'bradyskaurud@gmail.com',
    }
  });

  const oauthConnection = await db.OauthConnection.create({
    user_id: user.id,
    token: accessToken,
    refresh_token: refreshToken,  
    expires
  });

  // Spotify.setAccessToken(accessToken);
  // Spotify.setRefreshToken(refreshToken);

  res.json(oauthConnection);
});

module.exports = router;
