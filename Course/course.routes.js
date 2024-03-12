import express from "express";
import Course from "./course.model.js";
import { courseValidationSchema, paginationDataValidationSchema } from "./course.validation.js";
import mongoose from "mongoose";

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

router.put("/course/edit/:id", async (req, res) => {
  const courseId = req.params.id;
  const isValidMongoId = mongoose.isValidObjectId(courseId);

  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id" });
  }

  const requiredCourse = await Course.findOne({ _id: courseId });

  if (!requiredCourse) {
    return res.status(404).send({ message: "Course does not exist" });
  }

  const newValues = req.body;

  try {
    await courseValidationSchema.validate(newValues);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  return res.status(200).send({ message: "Course updated successfully" });
});

router.delete("/course/delete/:id", async (req, res) => {
  const courseId = req.params.id;
  const isValidMongoId = mongoose.isValidObjectId(courseId);

  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id" });
  }

  const requiredCourse = await Course.findOne({ _id: courseId });

  if (!requiredCourse) {
    return res.status(404).send({ message: "Course does not exist" });
  }

  await Course.deleteOne({ _id: courseId });

  return res.status(200).send({ message: "Course deleted successfully" });
});

router.get("/course/list", async (req, res) => {
  const paginationData = req.body;
  let validatedData;

  try {
    validatedData = await paginationDataValidationSchema.validate(paginationData);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  const skip = (validatedData.page - 1) * validatedData.limit;

  const courses = await Course.aggregate([
    { $match: {} },
    { $skip: skip },
    { $limit: validatedData.limit },
    { $project: { name: 1, duration: 1, price: 1, tutorName: 1 } },
  ]);

  return res.status(200).send({ message: "Success", courseList: courses });
});

export default router;
