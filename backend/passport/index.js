const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserModel = require('../database/models/AdminSchema')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  UserModel.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((error) => {
      done(error, user)
    })
})

//Create a passport middleware to handle User login
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email })
        if (!user) {
          return cb('Email does not exist!', false)
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validatePass = await bcrypt.compare(password, user.password)
        if (!validatePass) {
          return cb('Wrong Password!', false)
        }
        //Send the user information to the next middleware
        return cb(null, user, { message: 'Logged in success' })
      } catch (error) {
        return cb(error)
      }
    },
  ),
)

//Create a passport middleware to handle user registration
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        const { username, phone, role, department } = req.body
        console.log('req.body =>', req.body)
        const existingUsername = await UserModel.findOne({ username })
        if (existingUsername) {
          return cb({ error: 'Username already exists' })
        }
        // If Email exists return response to front "Email already exists";
        const existingEmail = await UserModel.findOne({ email })
        if (existingEmail) {
          return cb({ error: 'Email already exists' })
        }
        // If Phone Number exists return response to front "Phone Number already in use";
        const existingPhoneNumber = await UserModel.findOne({ phone })
        if (existingPhoneNumber) {
          return cb({ error: 'Phone Number already in use' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
          username: username,
          email,
          phone,
          role,
          department,
          password: hashPassword,
          confirmation: hashPassword,
        })
        const newUser = await user.save()
        if (newUser) {
          return cb(null, newUser, {
            message: 'Registration Succeeded, Welcome On Board!',
          })
        }
      } catch (error) {
        return cb(error)
      }
    },
  ),
)
