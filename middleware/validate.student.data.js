import { studentValidationSchema } from "../Student/student.validation.js";

export const validateStudentDataFromReqBody = async (req, res, next) => {
  const newValues = req.body;

  try {
    const validatedData = await studentValidationSchema.validate(newValues);

    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
