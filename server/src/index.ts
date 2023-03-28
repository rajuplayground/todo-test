import express from "express";
import todoRouter from "./todoRouter";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import healthcheckrouter from "./healthcheck";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("short"));

app.get("/", async (req, res) => {
  res.send("default route");
});

app.use("/healthcheck", healthcheckrouter);

app.use("/todos", todoRouter);

app.listen("4000", () => {
  console.log("server started");
});
