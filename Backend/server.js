import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import sessions  from "express-session";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

 
//Database connections
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Commerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

//middlewares for express
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( '/', router);

//server connection
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });

