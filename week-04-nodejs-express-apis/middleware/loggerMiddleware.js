function loggerMiddleware(req, res, next) {
  const startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    console.log(`${req.method} ${req.url} - Status: ${res.statusCode} - ${responseTime}ms`);
  });
  next();
}
export default loggerMiddleware;