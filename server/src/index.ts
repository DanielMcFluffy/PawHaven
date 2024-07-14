import { configDotenv } from "dotenv";
import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";

configDotenv({path: ".././config/config.env"})  

const PORT = process.env.PORT;

const app = express();

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("hello wdawdwdwd!!!!");
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
