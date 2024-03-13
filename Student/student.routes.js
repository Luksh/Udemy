import express from "express";
import Student from "./student.model.js";
import { studentValidationSchema } from "./student.validation.js";

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

export default router;
