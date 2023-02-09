import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    isHome: true,
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    isAbout: true,
  });
});

export default router;
