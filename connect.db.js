import mongoose from "mongoose";

const userName = "luksh";
const password = encodeURIComponent("luksh55");
const databaseName = "Udemy";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.j4uuoum.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connection established.");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed.");
  }
};

export default connectDB;
