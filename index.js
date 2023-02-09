import express from "express";
import mongoose from "mongoose";
import { engine, create } from "express-handlebars";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import session from "express-session";

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
app.use(AppRoutes);
app.use(AuthRoutes);
app.use(express.json());
app.use(session({secret: "secret", resave: false, saveUninitialized: false}));
// app.use(express.cookieParser("keyboard cat"));
// app.use(express.session({ cookie: { maxAge: 60000 } }));
app.use(flash());

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
