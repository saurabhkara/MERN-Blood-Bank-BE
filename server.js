import express from "express";
import testRouter from "./routes/testRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
dotenv.config();

//MONGODB Connection
connectDB();

//Rest Object
const app = express();

//Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to BLood Bank App",
  });
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", testRouter);
app.use("/api/v1/auth", authRouter);

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Express Server Running in ${process.env.DEV_MODE} mode on port ${PORT} `
      .bgBlue.white
  );
});

// 6c7vuHiqvZP6U5Xr
