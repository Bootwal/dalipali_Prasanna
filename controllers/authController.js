const express=require('express');
const app=express();
let passport = require("passport");
let passportConfig = require("../auth/passport");
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
const bcrypt=require('bcrypt')
const User=require('../models/register')


exports.login=(req,res)=>{
    res.render('auth/login');
}

exports.postLogin=passport.authenticate("local-signin",{
    failureRedirect:'/login',
    successRedirect:'/',
    session:false,
})

exports.register=(req,res)=>{
    res.render('auth/register');
}


exports.postRegister = passport.authenticate("local-signup", {
    failureRedirect: "/register",
    successRedirect: "/login",
    session: false,
  });

  exports.logout=(req,res)=>{
    req.session.destroy();
    res.redirect("/");
  }