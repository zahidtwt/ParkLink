const Router = require('express');
const router = Router();
//***import controller */
const controller = require('../controllers/appController');
const { authMiddleware, localVariables } = require('../middlewares/auth');
const registerMail = require('../controllers/mailer');
router.route('/registerMail').post(registerMail);
// POST Method
router.route('/register').post(controller.register); // register user
// router.route('/registerMail').post(); // send the email
router.route('/authenticate').post((req, res) => {
  res.end();
}); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

// Get Method
router.route('/verifymobile/').get(controller.verifyMobile);
router.route('/user/:username').get(controller.getUser); // user with number
router
  .route('/generateOTP')
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// Put Method
router.route('/updateuser').put(authMiddleware, controller.updateUser); // update the user profile
router
  .route('/resetPassword')
  .put(controller.verifyUser, controller.resetPassword); // use to reset password
router.get('/protected-route', authMiddleware, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.send(`Welcome, ${req.user.username}!`);
});
module.exports = router;
