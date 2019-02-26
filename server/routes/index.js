/**
 * File name: routes/index.js
 * Author's name: Nusrat Jahan
 * Student Id: 300967157
 * Web App name: Favourite Book List
 */

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// define the User Model
let usersModel = require("../models/users");
let Users = usersModel.Users; // alias

// define the b0ok model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home Page',
    displayName: req.users ? req.users.displayName : "" 
   });
});

/* GET book list page. wildcard 

router.get('/books', (req, res, next) => {
  res.render('content/index', {
    title: 'My Favourite Books',
    books:'',
    displayName: req.users ? req.users.displayName : ""
   });
});


*/


                                      /**    
                                       * 
                                       * Authentication  */


/* GET - displays the Login Page */
router.get('/login', (req, res, next) => {
  // check if user is already logged in
  if (!req.users) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.users ? req.users.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
});

/* POST - processes the Login Page */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', 
  (err, users, info) => {
    // server error?
    if(err) {
      return next(err);
    }
    // is there a user login error?
    if(!users) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect('/login');
    }
    req.logIn(users, (err) => {
      // server error?
      if(err) {
        return next(err);
      }
      return res.redirect('/books');
    });
  })(req, res, next);
});

/* GET - displays the User Registration Page */
router.get('/register', (req, res, next) => {
  if (!req.users) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.users ? req.users.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
});

/* POST - processes the User Registration Page */
router.post('/register', (req, res, next) => {
  // define a new user object
  let newUser = new Users({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  Users.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.users ? req.users.displayName : ""
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/books");
      });
    }
  });
});

/* GET - perform user logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;
