const Spotify = require('../components/spotify');
const db = require('../models/index.js');

module.exports = (router) => {
  router.get('/authorize', async function(req, res, next) {

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
