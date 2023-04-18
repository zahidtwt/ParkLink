const Router = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const registerMail = require('../controllers/mailer');

//// AUTH CONTROLLER ////
authRouter.route('/registerMail').post(registerMail);
// POST Method
authRouter.route('/register').post(authController.register); // register user
// authRouter.route('/registerMail').post(); // send the email
authRouter.route('/authenticate').post((req, res) => {
  res.end();
}); // authenticate user
authRouter
  .route('/login')
  .post(authController.verifyUser, authController.login); // login in app

// Get Method
authRouter.route('/verifymobile/').get(authController.verifyMobile);
authRouter.route('/user/:username').get(authController.getUser); // user with number
// authRouter
//   .route('/generateOTP')
//   .get(authController.verifyUser, localVariables, authController.generateOTP); // generate random OTP
authRouter.route('/verifyOTP').get(authController.verifyOTP); // verify OTP
authRouter.route('/createResetSession').get(authController.createResetSession); // reset all the variables

// Put Method
authRouter.route('/updateuser').put(authMiddleware, authController.updateUser); // update the user profile
authRouter
  .route('/resetPassword')
  .put(authController.verifyUser, authController.resetPassword); // use to reset password
authRouter.get('/protected-route', authMiddleware, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.send(`Welcome, ${req.user.username}!`);
});
module.exports = authRouter;
