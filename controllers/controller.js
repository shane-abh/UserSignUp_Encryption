import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/model.js";

class Controller {
  static test_get = (req, res) => {
    res.send("From Controller");
  };

  static dashboard_get = (req,res) => {
    res.render('dashboard.ejs')
  };

  static signup_get = (req, res) => {
    //Handle sign up of a new user
    // req.session.signup_msg = "Please Sign Up First";
    // req.session.signup_username = form_data.name;

    const new_signup_username = req.session.signup_username;
    delete req.session.signup_username;

    const new_signup_message = req.session.signup_msg;
    delete req.session.signup_msg;

    res.render("signup.ejs", { new_signup_username, new_signup_message });
  };

  static signup_post = async (req, res) => {
    try {
      const form_data = req.body;
      console.log(form_data);

      const user_matched = await userModel.findOne({ email: form_data.email });

      if (!user_matched) {
        const hashed_pwd = await bcrypt.hash(form_data.pwd, 12);

        const userData = new userModel({
          name: form_data.username,
          email: form_data.email,
          pwd: hashed_pwd,
        });

        const user_saved = await userData.save();

        req.session.new_user_message = "Welcome as a new user";
        req.session.new_user_user_name = user_saved.name;

        res.redirect("/dashboard");
      } else {
        req.session.user_exists_message = "This is an existing user";
        req.session.user_exists_user_name = user_matched.name;

        // These session variables will be user in login_get
        res.redirect("/login");
      }
    } catch (err) {
      console.log(`You have an error: ${err}`);
    }
  };

  static login_get = (req, res) => {
    // Handle the case of exisiting user

    const user_exists_message = req.session.user_exists_message;
    delete req.session.user_exists_message;

    const user_exists_user_name = req.session.user_exists_user_name;
    delete req.session.user_exists_user_name;

    //Handle new user
    // req.session.new_user_message = "Welcome as a new user";
    // req.session.new_user_user_name = user_saved.name;

    const new_user_message = req.session.new_user_message;
    delete req.session.new_user_message;

    const new_user_user_name = req.session.new_user_user_name;
    delete req.session.new_user_user_name;

    req.session.isValidated =false;

    //Handling existing user with wrong password
    const pwd_msg = req.session.pwd_msg;
    delete req.session.pwd_msg;

    const user_email = req.session.user_email;
    delete req.session.user_email;

    res.render("login.ejs", {
      user_exists_message,
      user_exists_user_name,
      new_user_message,
      new_user_user_name,
      pwd_msg,
      user_email,
    });
  };

  static login_post = async (req, res) => {
    try {
      const form_data = req.body;
      console.log(form_data);

      const user_matched = await userModel.findOne({ email: form_data.email });

      if (user_matched) {
        const pwd_matched = await bcrypt.compare(
          form_data.pwd,
          user_matched.pwd
        );
        if (pwd_matched) {
          req.session.isValidated = true;
          res.redirect("/dashboard");
        } else {
          req.session.pwd_msg = "Please enter correct password";
          req.session.user_email = form_data.email;

          res.redirect("/login");
        }
      } else {
        req.session.signup_msg = "Please Sign Up First";
        req.session.signup_username = form_data.email;

        // Use these session variables in signup_get
        res.redirect("/signup");
      }
    } catch (err) {
      console.log(`You have an error: ${err} `);
    }
  };


  static logout_post = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  
  }

}




export default Controller;
