const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const registerMail = require('../controllers/mailer');

const authRouter = express.Router();

// Public endpoints
authRouter.post('/registerMail', registerMail);
authRouter.post('/register', authController.register);
authRouter.post('/authenticate', (req, res) => {
  res.end();
});
authRouter.post('/login', authController.verifyUser, authController.login);

authRouter.get('/verifymobile', authController.verifyMobile);
authRouter.get('/user/', authMiddleware, authController.getUser);
authRouter.get('/verifyOTP', authController.verifyOTP);
authRouter.get('/createResetSession', authController.createResetSession);

// Private endpoints
authRouter.put('/updateuser', authMiddleware, authController.updateUser);
authRouter.put(
  '/resetPassword',
  authController.verifyUser,
  authController.resetPassword
);
authRouter.get('/protected-route', authMiddleware, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

module.exports = authRouter;
