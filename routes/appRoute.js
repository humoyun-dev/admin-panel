import { Router } from "express";
import News from "../models/News.js";
import userMiddleware from "../middleware/user.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/", auth, (req, res) => {
  res.render("index", {
    title: "Home",
    isHome: true,
    token: true,
  });
});

router.get("/about", auth, (req, res) => {
  res.render("about", {
    title: "About",
    isAbout: true,
  });
});

// News
router.get("/news", auth, async (req, res) => {
  const news = await News.find().populate("user").lean();

  res.render("news/news", {
    title: "News",
    isNews: true,
    news: news.reverse(),
    userId: req.userId || null,
  });
});

router.get("/news/add", auth, (req, res) => {
  res.render("news/add", {
    title: "add",
    isNews: true,
    errorAddNews: req.flash("addNews"),
  });
});

router.post("/news/add", userMiddleware, async (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content || !image) {
    req.flash("addNews", "All fields are required");
    res.redirect("/news/add");
    return;
  }

  const news = await News.create({ ...req.body, user: req.userId });
  res.redirect("/news");
});

export default router;
