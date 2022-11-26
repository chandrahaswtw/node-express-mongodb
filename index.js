const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();
const { makeConnection, getDB } = require("./utils/database");

// Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/error");

// Using body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Static files
app.use(express.static(path.join(__dirname, "static")));

// EJS setup
app.set("view engine", "ejs");
const allViews = path.join(__dirname, "views");
app.set("views", allViews);

// Auth route
app.use((req, res, next) => {
  next();
});

// Using routes
app.use(shopRoutes);
app.use(adminRoutes);
app.use(errorRoute);

// Start the server
makeConnection((error, db) => {
  if (error) {
    console.log("Error in connecting to DB ", error);
    return;
  }
  if (db) {
    console.log("DB connection successful");
    app.listen(3000, () => {
      console.log("App started on port 3000");
    });
  }
});
