require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroutes');
const thoughtRoutes = require('./routes/thoughtroutes');

const app = express();

app.use(express.json());

mongoose.connect(`mongodb+srv://fsolleder3:fred1231@cluster0.op23t.mongodb.net/social_db`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));