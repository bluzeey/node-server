const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");
const MONGODBURI =
  "mongodb+srv://sahilm:sahilm123@mongodb-tut.stjbs.mongodb.net/shop?retryWrites=true";

const app = express();
const store = new MongoDBStore({ uri: MONGODBURI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if(req.session.isLoggedIn){
  User.findById("6367a27a643703085c6e6072")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err))};
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb+srv://sahilm:sahilm123@mongodb-tut.stjbs.mongodb.net/shop")
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Sahil",
          email: "sahil@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });