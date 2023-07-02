import mongoose from "mongoose";

const connectDB = async () => {
  // console.log(process.env.MONGO_CONNECT)
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(
      `Connected to Database ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`MongoDB Database Error ${error}`.bgRed.white);
  }
};

export default connectDB;
