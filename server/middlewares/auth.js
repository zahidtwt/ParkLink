const ENV = require('../config');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User.model');
const mongoose = require('mongoose');
module.exports = auth = async function (req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    const dummy_id = new mongoose.Types.ObjectId();
    req.user = { _id: dummy_id, username: 'Test' };
    return next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
    const _id = decodedToken._id;
    const user = await UserModel.findById(_id);
    if (!user) {
      return res.status(401).send({ error: 'Invalid token: user not found' });
    }
    req.user = { _id, username: user.username };
    next();
  } catch (err) {
    return res.status(401).send({ error: err });
  }
};

// localVariables: function (req, res, next) {
//   req.app.locals = {
//     OTP: null,
//     resetSession: false,
//   };
//   next();
// },
