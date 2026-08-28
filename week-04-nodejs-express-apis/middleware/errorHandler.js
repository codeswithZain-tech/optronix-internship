function errorHandler(err, req, res, _next) {
  console.log("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    details: err.details || null
  });
}
export default errorHandler;