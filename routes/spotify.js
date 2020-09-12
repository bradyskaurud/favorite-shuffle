const Spotify = require('../components/spotify');

module.exports = (router) => {
  router.get('/artists', async (req, res, next) => {
    const {
      query,
    } = req || {};
  
    const searchCriteria = query.search;
  
    const returnedArtists = await Spotify.getArtistsAlbums(searchCriteria);
  });
  
  router.get('/spotify/callback', async (req, res, next) => {
    const { code } = req.query || {};
  
    const response = await Spotify.authorizationCodeGrant(code);
  
    const { access_token: accessToken, refresh_token: refreshToken, expires_in: expires }  = (response && response.body) || {};
  
    // TODO: Dynamically get User based on an ID passed in 
    const user = await db.User.findOne({
        where: {
          email: 'bradyskaurud@gmail.com',
      }
    });
  
    let oauthConnection;
    oauthConnection = await db.OauthConnection.findOne({
      where: {
        user_id: user.id,
      }
    });
  
    if (!oauthConnection) {
      oauthConnection = await db.OauthConnection.create({
        user_id: user.id,
        token: accessToken,
        refresh_token: refreshToken,  
        expires
      });
    }
  
    // Spotify.setAccessToken(accessToken);
    // Spotify.setRefreshToken(refreshToken);
  
    res.redirect('/');
  });
  
  router.get('/spotify/authorize', async function(req, res, next) {
  
    // TODO: Load user dynamically by ID
    const user = await db.User.findOne({
      where: {
        email: 'bradyskaurud@gmail.com',
      },
    })
  
    if (!user) {
      await db.User.create({ firstName: 'Brady', lastName: 'S', email: 'bradyskaurud@gmail.com', password: 'Password987' });
    }
  
    const authorizeUrl = Spotify.getAuthorizeUrl();
    res.json({authorizeUrl});
  });
};
