import Yup from "yup";

export const studentValidationSchema = Yup.object({
  firstName: Yup.string().trim().required().max(30, "First name must be at max 30 characters."),
  lastName: Yup.string().trim().required().max(30, "Last name must be at max 30 characters."),
  email: Yup.string()
    .trim()
    .required()
    .lowercase()
    .max(50, "Email must be at max 50 characters.")
    .email("Invalid email format."),
  contactNumber: Yup.string()
    .trim()
    .required()
    .max(15, "Contact number must be at max 15 characters.")
    .min(10, "Contact number must be at least 10 characters."),
  isGratuated: Yup.boolean(),
});
