const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const UserRoutes = require('./routes/user');
const ProjectRoutes = require('./routes/project');
const MessageRoutes = require('./routes/message');
const PaymentRoutes = require('./routes/payment');
const InfoRoutes = require('./routes/info');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

app.use('/api/v1/user',UserRoutes)
app.use('/api/v1/project',ProjectRoutes)
app.use('/api/v1/message',MessageRoutes)
app.use('/api/v1/payment',PaymentRoutes)
app.use('/api/v1/info',InfoRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});