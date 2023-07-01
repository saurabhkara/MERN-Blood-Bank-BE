import express from "express";
import testRouter from "./routes/testRoutes.js";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

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
app.use("/api/v1/", testRouter);

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Express Server Running in ${process.env.DEV_MODE} mode on port ${PORT} `
      .bgBlue.white
  );
});
