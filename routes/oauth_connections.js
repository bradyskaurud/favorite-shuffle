const db = require('../models/index.js');

module.exports = (router) => {
  router.get('/oauth_connections', async (req, res, next) => {
    const oauthConnection = await db.OauthConnection.findOne({
      where: {
        user_id: 9,
      },
    });
  
    res.json(oauthConnection);
  });
};
