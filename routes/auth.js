import { Router } from "express";
import User from "../models/User.js";
import bcrytp from "bcrypt";
import { generateJWTToken } from "../services/token.js";

const router = Router();

// Login

router.get("/login", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }
  res.render("auth/login", {
    title: "Login",
    isLoging: true,
    loginError: req.flash("loginError"),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    req.flash("loginError", "User not found");
    res.redirect("/login");
    return;
  }

  const isPassEqual = await bcrytp.compare(password, existUser.password);
  if (!isPassEqual) {
    req.flash("loginError", "Wrong password");
    res.redirect("/login");
    return;
  }
  const token = generateJWTToken(existUser._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });
  // console.log(req.body);
  res.redirect("/");
});

// Register

router.get("/register", (req, res) => {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }
  res.render("auth/register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    req.flash("registerError", "All fields are required");
    res.redirect("/register");
    return;
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    req.flash("registerError", "This email already registered");
    res.redirect("/register");
    return;
  }

  const hashedPassword = await bcrytp.hash(password, 10);
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  };
  // console.log(userData);
  const user = await User.create(userData);
  const token = generateJWTToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
