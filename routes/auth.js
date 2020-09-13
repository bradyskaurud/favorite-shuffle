const Spotify = require('../components/spotify');
const db = require('../models/index.js');
const { hashPassword, comparePassword } = require('../components/auth.js');
const jwt = require('jsonwebtoken');
const Config = require('../config/index.js');

module.exports = (router) => {
  router.post('/login', async (req, res) => {
    const {
        email,
        password,
    } = req.body || {};

    const user = await db.User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return res.json({
        success: false,
        message: 'Unsuccessful login. No User found.',
      });
    }

    const isMatchedPassword = await comparePassword(password, user.password);  
    
    if (!isMatchedPassword) {
      return res.json({
        success: false,
        message: 'Unsuccessful login. Invalid username or password.',
      });
    }

    const token = jwt.sign({ id: user.id}, Config.jwtSecret, { expiresIn: 86400 });

    res.json({
      success: true,
      user: {
        id: user.id, 
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      token,
    });
  });

  router.post('/register', async (req, res) => {
      const {
          firstName,
          lastName,
          email,
          password
      } = req.body || {};

      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        const createdUser = await db.User.create({ 
          firstName,
          lastName,
          email,
          password: await hashPassword(password), 
        });

        return res.json(createdUser);
      }

      return res.json({
        success: false,
        message: 'User already exists',
      })
  });
};
