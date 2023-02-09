import { Router } from "express";
import User from "../models/User.js";
import bcrytp from "bcrypt";

const router = Router();

// Login

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    isLoging: true,
    loginError: req.flash('loginError'),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields are required");
    res.redirect("/login");
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    console.log("User not found", req.body.email);
    return false;
  }

  const isPassEqual = await bcrytp.compare(password, existUser.password);
  if (!isPassEqual) {
    console.log("Password not match");
    return false;
  }

  // console.log(req.body);
  res.redirect("/");
});

// Register

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    isRegister: true,
    registerError: "Error",
  });
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrytp.hash(req.body.password, 10);
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };
  // console.log(userData);
  res.redirect("/");
  const user = await User.create(userData);
});

export default router;
