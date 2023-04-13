const UserModel = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config');
module.exports = controller = {
  /** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 1953534243,

}
*/
  register: async function (req, res) {
    try {
      const { username, password, email, mobile } = req.body;

      // Check for existing user and email
      const existingUser = await UserModel.findOne({ username });
      const existingEmail = await UserModel.findOne({ email });
      const existingMobile = await UserModel.findOne({ mobile });

      if (existingUser) {
        return res.status(400).send({ error: 'Please use unique username' });
      }
      if (existingEmail) {
        return res.status(400).send({ error: 'Email already registered' });
      }
      if (existingMobile) {
        return res.status(400).send({ error: 'Mobile No already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new UserModel({
        username,
        password: hashedPassword,
        email,
        mobile,
      });

      // Save the user to the database
      await user.save();

      // Send a success response
      res.status(201).send({ msg: 'User Registered Successfully' });
    } catch (error) {
      // Handle any errors
      res.status(500).send({ error: error });
    }
  },
  /** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
  login: async function (req, res) {
    const { username, password } = req.body;

    try {
      // Find user with matching username
      const user = await UserModel.findOne({ username });

      // If user not found, return error response
      if (!user) {
        return res.status(404).send({ error: 'Username not found' });
      }

      // Compare input password with hashed password in the database
      const passwordCheck = await bcrypt.compare(password, user.password);

      // If password doesn't match, return error response
      if (!passwordCheck) {
        return res.status(400).send({ error: "Password doesn't match" });
      }

      // Create JWT token with user ID and username as payload
      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        ENV.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );

      // Return success response with user data and token
      return res.status(200).send({
        msg: 'Login Successful...!',
        username: user.username,
        token,
      });
    } catch (error) {
      // Return error response for any unhandled error
      return res.status(500).send({ error });
    }
  },

  /** GET: http://localhost:8080/api/user/example123 */
  getUser: async function (req, res) {},

  /** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
  updateUser: async function (req, res) {},

  /** GET: http://localhost:8080/api/generateOTP */
  generateOTP: async function (req, res) {},

  /** GET: http://localhost:8080/api/verifyOTP */
  verifyOTP: async function (req, res) {},

  // successfully redirect user when OTP is valid
  /** GET: http://localhost:8080/api/createResetSession */
  createResetSession: async function (req, res) {},

  // update the password when we have valid session
  /** PUT: http://localhost:8080/api/resetPassword */
  resetPassword: async function (req, res) {},
};
