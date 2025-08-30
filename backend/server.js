import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import Dashboard from "./models/dashboardModel.js";
import "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const port = 8000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("mongodb Connected");

    // // Test save
    // const testData = new Dashboard({
    //   userId: "123",
    //   totalIncome: 5000,
    //   expense: 2000,
    //   healthFood: 500,
    //   rent: 1500,
    //   utility: 300,
    //   recivable: 200,
    //   payable: 100,
    //   other: 400,
    // });

    // await testData.save();
    // console.log("Test document saved!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
