const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
