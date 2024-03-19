const express = require("express");
const app = express();

require("./database/connection");

require("./passport");

const Local = require("./database/model");
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const session = require("express-session");

const MongoStore = require("connect-mongo");
const { hashSync } = require("bcrypt");
const passport = require("passport");
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",

    resave: false,
    saveUninitialized: true,
    //blog
    store: MongoStore.create({
      mongoUrl: "connection string",
      collectionName: "sessions",
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/register", (req, res) => {
  const user = new Local({
    name: req.body.name,
    password: hashSync(req.body.password, 10),
  });
  user.save().then((user) => {
    console.log(user);
    res.send("success");
  });
});

app.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/protected" })
);

app.get("/protected", (req, res) => {
  if (req.isAuthenticated) {
    res.send("protected");
  } else {
    res.send("unauthorized");
  }
  console.log(req.user);
  console.log(req.session);
});

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:3000/login"));
});

app.listen(80, () => {
  console.log("server at 80");
});
