const db = require('../models/index.js');

module.exports = (router) => {
    router.get('/users', async (req, res, next) => {
        const {
            id,
        } = req.body || {};

        const user = await db.User.findOne({
          where: {
            email: 'bradyskaurud@gmail.com',
          },
        })
      
        res.json(user);
    });
};
