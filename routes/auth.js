import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login"
  });
});

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register"
  });
});

export default router;
 