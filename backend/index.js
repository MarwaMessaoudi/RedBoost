require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const helmet = require("helmet");
const mongoose = require("mongoose");
const multer = require("multer");
const Kpi = require('./database/models/KpiSchema'); // Correct model import
const LocalStrategy = require("passport-local").Strategy;
const User = require('./database/models/UserSchema');
// Connect to MongoDB
const db = process.env.DATABASE_URI;
const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000;
const app = express();
const nodemailer = require('nodemailer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Import Routes
const registerUser = require("./routes/api/register");
const loginRoute = require("./routes/api/login");
const checkAuthRoute = require("./routes/api/checkAuth");
const logoutRoute = require("./routes/api/logout");
const usersRoute = require("./routes/api/users");
const UpdateUser = require("./routes/api/UpdateUser");
const checkPass = require("./routes/api/checkPass");
const AddEvent = require("./routes/api/AddEvent");
const getEvents = require("./routes/api/getEvents");
const deleteEvent = require("./routes/api/DeleteEvent");
const UpdateEvent = require("./routes/api/UpdateEvent");
const forgetPassword = require("./routes/api/ForgetPassword");
const handleProgram = require("./routes/api/handleProgram");
const handleActivity = require("./routes/api/handleActivity");
const hundleEntrepreneur = require("./routes/api/hundleEntrepreneur");
const handleStartups = require("./routes/api/handleStartups");
const sessionsRoute = require("./routes/api/Sessions");
//const handleKpi = require("./routes/api/handleKpi");
const taskRoutes = require("./routes/api/taskController"); // Import the task controller
const handleKpi = require("./routes/api/handleKpi");
const emailRouter = require("./routes/api/emailRouter");

require("./passport/index");

// Middleware configuration
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

//app.use("/kpis", handleKpi);
app.use('/', taskRoutes); // Use the task controller as middleware
app.use('/', handleKpi);
const store = new MongoDBSession({
  uri: db,
  collection: "sessions",
});



// Add event listeners to the store
store.on("connected", () => {
  console.log("Session store connected!");
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(
  session({
    key: "sessionId",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Cloudinary file upload routes
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  cloudinary.uploader.upload(
    req.file.path,
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        console.error("Upload error:", error);
        return res.status(500).send({ message: "Upload failed", error });
      }
      res.status(200).send(result);
    }
  );
});

app.post("/uploadLogo", upload.single("logo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  cloudinary.uploader.upload(
    req.file.path,
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        console.error("Upload error:", error);
        return res.status(500).send({ message: "Upload failed", error });
      }
      res.status(200).send(result);
    }
  );
});

app.use(passport.initialize());
app.use(passport.session());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Request body:", req.body);
  if (req.file) {
    console.log("Files:", req.file);
  }
  next();
});

// Define routes
app.use("/api", registerUser);
app.post("/login", loginRoute);
app.post("/events", AddEvent);
app.post("/forget-password", forgetPassword);
app.get("/login", checkAuthRoute);
app.get("/logout", logoutRoute);
app.post("/loadCurrentUser", usersRoute);
app.post("/loadUserById", usersRoute);
app.post("/loadUsers", usersRoute);
app.get("/checkPass", checkPass);
app.get("/events", getEvents);
app.put("/users/:userId", UpdateUser);
app.delete("/deleteUser/:userId", usersRoute);
app.put("/updateUser/:userId", usersRoute);
app.put("/events/:idEvent", UpdateEvent);
app.delete("/events/:idEvent", deleteEvent);
app.post("/addProgram", handleProgram);
app.delete("/deleteProgram/:programId", handleProgram);
app.put("/updateProgram/:programId", handleProgram);
app.post("/loadPrograms", handleProgram);
app.post("/addActivity", handleActivity);
app.delete("/deleteActivity/:activityId", handleActivity);
app.put("/updateActivity/:activityId", handleActivity);
app.post("/loadActivity/:activityId", handleActivity);
app.post("/loadActivitiesByProgramId/:programId", handleActivity);
app.post("/createentrepreneurs", hundleEntrepreneur);
app.post("/createstartup", handleStartups);
app.get("/loadAllentrepreneurs", hundleEntrepreneur);

app.get("/sessions", sessionsRoute);
app.delete("/deleteEntrepreneur/:id",hundleEntrepreneur)
app.put("/updateEntrepreneur/:id",hundleEntrepreneur)
app.get("/filterEntrepreneurs",hundleEntrepreneur);

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
app.post("/sendEmail", emailRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong", error: err });
});

// Database + Server Connection Validation
mongoose
  .connect(db)
  .then(() => {
    
    

    app.listen(PORT, () => {
      console.log("Database Connected!");
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
