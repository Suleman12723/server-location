import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import errorHandler from "./middleware/globalErrorHandler.js";
const app = express();

//routes import
import uploadRouter from "./routes/upload.routes.js";
import adRouter from "./routes/ad.routes.js";
import NOTFOUND from "./errors/notFound.js";

//connect to mongoose
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the Database");
  })
  .catch((err) => console.log(err));

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/upload", uploadRouter);
app.use("/ad", adRouter);

//404 when invalid route is given
app.use((req, res, next) => {
  next(new NOTFOUND("Resource not found"));
});

//error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
