import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDataBase from "./database/database.js";
connectDataBase();
import Routes from "./routes/routes.js";
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api", Routes);
app.get("/", (req, res) => res.send(""));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
