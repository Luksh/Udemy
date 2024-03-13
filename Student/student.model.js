import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    lowercase: true,
    unique: true, //index
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
    minlength: 10,
  },
  isGratuated: {
    type: Boolean,
    required: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
