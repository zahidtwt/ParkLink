const ENV = require('../config');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User.model');
module.exports = auth = {
  authMiddleware: async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(401).send({ error: 'Invalid token: user not found' });
      }
      req.user = { userId, username: user.username };
      next();
    } catch (err) {
      return res.status(401).send({ error: err });
    }
  },

  localVariables: function (req, res, next) {
    req.app.locals = {
      OTP: null,
      resetSession: false,
    };
    next();
  },
};
