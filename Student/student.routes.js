import express from "express";
import Student from "./student.model.js";
import { studentValidationSchema } from "./student.validation.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.id.js";
import { validateStudentDataFromReqBody } from "../middleware/validate.student.data.js";

const router = express.Router();

// router.post("/student/add", async (req, res) => {
//   const newStudent = req.body;

//   let validatedData;

//   try {
//     validatedData = await studentValidationSchema.validate(newStudent);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }

//   const student = await Student.findOne({ email: newStudent.email });

//   if (student) {
//     return res.status(409).send({ message: "Email already exists." });
//   }

//   await Student.create(newStudent);

//   return res.status(201).send({ message: "Student added successfully." });
// });

router.post(
  "/student/add",
  async (req, res, next) => {
    // extract new student from req.body
    const newStudent = req.body;

    try {
      // validate new student
      const validatedData = await studentValidationSchema.validate(newStudent);

      req.body = validatedData;
      // call next function
      next();
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new student from req.body
    const newStudent = req.body;

    // check if email already used
    const student = await Student.findOne({ email: newStudent.email });

    // if email already occupied, throw error
    if (student) {
      return res.status(409).send({ message: "Email already exists." });
    }

    // create user
    await Student.create(newStudent);

    // send response
    return res.status(201).send({ message: "Student is added successfully." });
  }
);

router.delete("/student/delete/:id", validateMongoIdFromReqParams, async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  await Student.deleteOne({ _id: studentId });

  return res.status(200).send({ message: "Student deleted successfully" });
});

router.get("/student/details/:id", validateMongoIdFromReqParams, async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  return res.status(200).send({ message: "Success", studentDetails: student });
});

router.put("/student/edit/:id", validateMongoIdFromReqParams, validateStudentDataFromReqBody, async (req, res) => {
  const studentId = req.params.id;
  const newValues = req.body;

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    return res.status(404).send({ message: "Student does not exist." });
  }

  await Student.updateOne({ _id: studentId }, { $set: { ...newValues } });

  return res.status(200).send({ message: "Student updated successfully." });
});

export default router;
