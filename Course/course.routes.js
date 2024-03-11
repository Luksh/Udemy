import express from "express";
import Course from "./course.model.js";
import { courseValidationSchema } from "./course.validation.js";

const router = express.Router();

router.post("/course/add", async (req, res) => {
  const newCourse = req.body;

  try {
    await courseValidationSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  await Course.create(newCourse);

  return res.status(201).send({ message: "Course added successfully." });
});

export default router;
