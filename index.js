import express from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";
// Routes
import AppRoutes from "./routes/appRoute.js";
import AuthRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(flash());
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: "Sammi", resave: false, saveUninitialized: false }));
app.use(varMiddleware);
app.use(userMiddleware);

app.use(AppRoutes);
app.use(AuthRoutes);
// app.use(express.cookieParser("keyboard cat"));
// app.use(express.session({ cookie: { maxAge: 60000 } }));

const startApp = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      },
      () => console.log("Mongo DB connect")
    );

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
