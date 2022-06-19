import "./lib/db";
import express from "express";
import countryRoutes from "./routes/country";
import personRoutes from "./routes/person";

const app = express();
const port = process.env.PORT || 3333;
 
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  next();
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*')
  next();
});

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /persons to view all the persons" });
});

app.use("/countries", countryRoutes);
app.use("/persons", personRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
