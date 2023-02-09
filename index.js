import express from "express";
import { engine, create } from "express-handlebars";
import AppRoutes from "./routes/appRoute.js";
import AuthRoutes from "./routes/auth.js";

const app = express();
const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(AppRoutes);
app.use(AuthRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
