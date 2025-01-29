const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../database/models/UserSchema')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id)
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
    async (email, password, done) => {
      try {
        console.log('Login request received for email:', email);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          console.log('User not found');
          return done(null, false, { message: 'Email does not exist!' });
        }

        // Check password
        console.log('Validating password...');
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log('Invalid password');
          return done(null, false, { message: 'Incorrect password!' });
        }

        // Check if user is validated
      
       
 
        // Successful login
        console.log('Login successful for user:', user.username);
        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        console.error('Error during login:', error);
        return done(error);
      }
    }
  )
);


//Create a passport middleware to handle user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        console.log("Signup request body:", req.body);

        // Extract additional fields from req.body
        const { username, phone, role, department } = req.body;

        // Check for existing users
        console.log("Checking for existing username...");
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
          console.log("Username already exists");
          return cb({ error: "Username already exists" });
        }

        console.log("Checking for existing email...");
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          console.log("Email already exists");
          return cb({ error: "Email already exists" });
        }

        console.log("Checking for existing phone...");
        const existingPhoneNumber = await User.findOne({ phone });
        if (existingPhoneNumber) {
          console.log("Phone number already in use");
          return cb({ error: "Phone number already in use" });
        }

        // Hash the password
        console.log("Hashing password...");
        const hashPassword = await bcrypt.hash(password, 10);

        // Save new user
        console.log("Saving new user...");
        const user = new User({
          username,
          email,
          phone,
          role,
          department,
          password: hashPassword,
          confirmation: hashPassword,
        });
        const newUser = await user.save();

        console.log("New user saved:", newUser);
        return cb(null, newUser, {
          message: "Registration succeeded. Welcome on board!",
        });
      } catch (error) {
        console.error("Error during signup:", error);
        return cb(error);
      }
    }
  )
);
