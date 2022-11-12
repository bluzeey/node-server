const bcrypt = require("bcryptjs");
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

const User = require("../models/user");

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));


exports.getLogin = (req, res, next) => {
  let message=req.flash('error')
  if(message.length>0){
    message=message[0]
  }else{
    message=null
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage:req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error','Invalid email or password')
        res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error','Email exists already, please pick a different one.')
        return res.redirect("/signup");
      }
      return bcrypt.hash(password,12).then((hashedPassword) => {
        console.log(password,hashedPassword)
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
      transporter.sendMail({
        to:email,
        from:'shop@node-tut.com',
        subject:'Signup Suceeded!',
        html:'<h1>You successfully signed up!</h1>'
      }).then(result=>
        console.log('message sent successfully')).catch(err=>console.log(err))
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
