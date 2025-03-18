const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./Routes/ContactRoute');
const AuthRoute = require('./Routes/AuthRoute');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); // Use built-in JSON middleware

// Define routes
app.use('/', contactRoutes);
app.use('/', AuthRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FazFood', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
