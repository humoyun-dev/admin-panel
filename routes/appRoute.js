import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  if (!req.cookies.token){
    res.redirect("/login");
    return;
  }
  res.render("index", {
    title: "Home",
    isHome: true,
    token: true,
  });
});

router.get("/about", (req, res) => {
  if (!req.cookies.token){
    res.redirect("/login");
    return;
  }
  res.render("about", {
    title: "About",
    isAbout: true,
  });
});

export default router;
