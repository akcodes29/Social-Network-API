require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const routes = require('./routes');
const db = require('./config/connection');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

db.once('open', () => {
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});
