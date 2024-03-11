import express from "express";
import connectDB from "./connect.db.js";
import courseRoutes from "./Course/course.routes.js";

const app = express();
app.use(express.json());

connectDB();

app.use(courseRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
