const express = require('express');
const userRoutes = require(".routes/userRoutes");

const app = express();

app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  });