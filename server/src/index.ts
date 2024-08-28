import { configDotenv } from "dotenv";
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { authRouter } from "./routes/authRouter";
import { errorHandler } from "./middlewares/error";
import { ErrorResponse } from "./utils/errorResponse";
import { BaseResponse } from "./utils/BaseResponse";
import sql from "./db";

async function getUsersOver() {
  const users = await sql`
    SELECT * FROM users
  `
  console.log(users);
  return users
}

getUsersOver();
configDotenv({path: ".././config/config.env"})  

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(session({
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 7000},
}))

app.use(passport.authenticate('session'));

app.use('/', authRouter)


app.use(errorHandler);

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
