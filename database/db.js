import mongoose from "mongoose";
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Database Is Connected");
  });
