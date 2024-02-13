import CustomError from "../errors/customError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ success: false, error: err });
  }
  res.status(err.status || 500).json({
    success: false,
    error: { message: err.message || "Some error occured!" },
  });
};

export default errorHandler;
