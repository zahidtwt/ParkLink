module.exports = controller = {
  /** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
  register: async function (req, res) {},

  /** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
  login: async function (req, res) {},

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
