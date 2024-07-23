const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const photoRoutes = require('./routes/photoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: '*', methods: '*' }));
// app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/photos', photoRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

// ERROR HANDLING
// app.use((err, req, res, next) => {
//     if (err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError') {
//         err.status = 422;
//     }
//     if (req.get('accept').includes('json')) {
//         res.status(err.status || 500).json({ message: err.message || 'Some error occurred.' });
//     } else {
//         res.status(err.status || 500).sendFile(path.join(__dirname, 'public', 'index.html'));
//     }
// });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to database"))
    .catch((error) => console.error('Error connecting to database:', error));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
