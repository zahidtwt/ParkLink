const Router = require('express');
const router = Router();
//***import controller */
const controller = require('../controllers/appController');
// POST Method
router.route('/register').post(controller.register); // register user
// router.route('/registerMail').post(); // send the email
router.route('/authenticate').post((req, res) => {
  res.end();
}); // authenticate user
router.route('/login').post(controller.login); // login in app

// Get Method
router.route('/user/:number').get(controller.getUser); // user with number
router.route('/generateOTP').get(controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// Put Method
router.route('/updateUser').put(controller.updateUser); // update the user profile
router.route('/resetPassword').put(controller.resetPassword); // use to reset password

module.exports = router;
