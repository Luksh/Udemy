import mongoose from "mongoose";

export const validateMongoIdFromReqParams = (req, res, next) => {
  const id = req.params.id;
  const isValidMongoId = mongoose.isValidObjectId(id);

  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongoid." });
  }

  next();
};
