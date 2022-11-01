import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";
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
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( '/', router);

//server connection
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });

