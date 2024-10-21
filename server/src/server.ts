import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/authRouter";
import { errorHandler } from "./middlewares/error";
import { medicineRouter } from "./routes/medicineRouter";
import { userRouter } from "./routes/userRouter";

configDotenv({path: ".././config/config.env"})  

const PORT = process.env.PORT;

const app = express();

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(session({
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60 * 60 * 1000, //1 hour
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
  }, 
}))

app.use(passport.authenticate('session'));

app.use('/', authRouter)
app.get('/data', (req: Request, res: Response) => {
  console.log('user', req.user);
  console.log('session', req.session);
  console.log('sessionID', req.session.id);
  console.log('authenticated', req.isAuthenticated());
  console.log(req.cookies);
})
app.use('/', userRouter);
app.use('/', medicineRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
