const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const sequelize = require("./utils/database");

// Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/error");

// Models
const { User } = require("./models/user");
const { Product } = require("./models/products");
const { Cart } = require("./models/cart");
const { CartItem } = require("./models/cartItem");

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
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Using routes
app.use(shopRoutes);
app.use(adminRoutes);
app.use(errorRoute);

// Relations
User.hasMany(Product);
Product.belongsTo(User);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Start the server
sequelize
  .sync()
  .then(async () => {
    app.listen(2000, () => {
      console.log("SERVER STARTED ON 2000");
    });
  })
  .catch((e) => {
    console.log("ERROR");
  });
