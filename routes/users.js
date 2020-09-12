const db = require('../models/index.js');

module.exports = (router) => {
    router.get('/users', async (req, res, next) => {
        const user = await db.User.findOne({
          where: {
            email: 'bradyskaurud@gmail.com',
          },
        })
      
        res.json(user);
    });
      
    router.get('/login', async (req, res, next) => {
        res.json(user);
    });
    
    router.get('/register', async (req, res, next) => {
        res.json(user);
    });
};
