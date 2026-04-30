require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const morgan = require('morgan');
const helmet = require('helmet');

const connectDB = require('./config/db'); // ✅ import

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));


// Routes
app.get('/test/', (req, res) => {
  res.send('API running...');
});

app.use('/api/v1/auth', require('./routes/authRoutes'));
// app.use('/api/v1/auth', require('./routes/authRoutes'));

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
