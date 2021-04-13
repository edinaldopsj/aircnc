const express = require('express');
const multer = require ('multer');
const uploadConfig = require('./config/upload');

// Controllers
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Session
routes.post('/sessions', SessionController.store);

// Spots
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// Dashboard
routes.get('/dashboard', DashboardController.show);

// Bookings
routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;