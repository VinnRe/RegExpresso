require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes.js');
const parseRoutes = require('./routes/parseRoutes.js'); 

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/parse", parseRoutes);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
});

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(port, () => {
console.log(`Server is running on ${port}`);
});
