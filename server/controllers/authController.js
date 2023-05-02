const UserModel = require('../model/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../config');
module.exports = authController = {
  /*** Middleware for verify user */

  verifyMobile: async function (req, res) {
    try {
      const { mobile } = req.method === 'GET' ? req.query : req.body;

      // Check if the user exists
      const user = await UserModel.findOne({ mobile });
      if (!user) return res.status(404).send({ error: "Can't find user 😒" });
      return res.status(200).send({
        mobile: user.mobile,
        username: user.username,
        firstName: user.firstName,
        profileImage: user.profileImage,
      });
    } catch (error) {
      // Authentication error occurred
      return res.status(401).send({ error: 'Authentication error' });
    }
  },

  verifyUser: async function (req, res, next) {
    try {
      const { username } = req.method === 'GET' ? req.query : req.body;

      // Check if the user exists
      const user = await UserModel.findOne({ username });
      if (!user) return res.status(404).send({ error: "Can't find user 😒" });

      // User exists, proceed to the next middleware/controller
      next();
    } catch (error) {
      // Authentication error occurred
      return res.status(401).send({ error: 'Authentication error' });
    }
  },

  register: async function (req, res) {
    try {
      const { username, password, email, mobile, firstName, lastName } =
        req.body;

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
        firstName,
        lastName,
      });

      // Save the user to the database
      await user.save();

      // Send a success response
      res.status(201).send(user);
    } catch (error) {
      // Handle any errors
      res.status(500).send({ error: error.message });
    }
  },

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
        { _id: user._id, username: user.username },
        ENV.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );

      // Return success response with user data and token
      return res.status(200).send({
        accessToken: token,
        msg: 'Successfully logged in',

        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          dob: user.dob,
          gender: user.gender,
          due: user.due,
          profileImage: user.profileImage,
          balance: user.balance,
          bookmarkedParkings: user.bookmarkedParkings,
        },
      });
    } catch (error) {
      // Return error response for any unhandled error
      return res.status(500).send({ error });
    }
  },

  /** GET: http://localhost:8080/api/user/example123
   * Get user by username
   */
  getUser: async function (req, res) {
    try {
      const userId = req.user._id;
      console.log('userId', userId);
      // Find user by userId
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send({ error: "Couldn't find the user" });
      }

      // Remove password from user object
      const { password, ...userData } = user.toJSON();

      return res.status(200).send(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  },
  /** PUT: http://localhost:8080/api/updateuser */
  updateUser: async function (req, res) {
    try {
      // Get user ID from authentication middleware
      const { _id } = req.user;

      if (_id) {
        const body = req.body;

        // Check if there are any changes made to user data
        if (Object.keys(body).length === 0) {
          return res
            .status(400)
            .send({ error: 'No changes made to User Data!' });
        }

        const result = await UserModel.updateOne({ _id }, body);

        return res.status(201).send({ msg: 'Record Updated...!' });
      } else {
        return res.status(401).send({ error: 'User Not Found...!' });
      }
    } catch (error) {
      return res.status(400).send(error.toJSON());
    }
  },

  /** GET: http://localhost:8080/api/generateOTP */
  generateOTP: function (req, res) {
    req.app.locals.OTP = Math.floor(1000 + Math.random() * 9000);
    res.status(201).send({ code: req.app.locals.OTP });
  },

  /** GET: http://localhost:8080/api/verifyOTP */
  verifyOTP: async function (req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === Number(code)) {
      req.app.locals.OTP = null; // reset otp value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify successfully' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
  },

  // successfully redirect user when OTP is valid
  /** GET: http://localhost:8080/api/createResetSession */
  createResetSession: async function (req, res) {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false; // allow access to this route only
      return res.status(201).send({ msg: 'access granted!' });
    }
    return res.status(440).send({ error: 'Session Expired!' });
  },

  // update the password when we have valid session
  /** PUT: http://localhost:8080/api/resetPassword */
  resetPassword: async function (req, res) {
    try {
      if (!req.app.locals.resetSession) {
        return res.status(440).send({ error: 'Session expired!' });
      }

      const { username, password } = req.body;

      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return res.status(404).send({ error: 'Username not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne(
          { username: user.username },
          { password: hashedPassword }
        );

        req.app.locals.resetSession = false;

        return res.status(201).send({ msg: 'Updated...' });
      } catch (error) {
        return res.status(500).send({ error: 'Failed to update password' });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  },
};
