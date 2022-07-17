const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const mongoose = require('mongoose');

router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:id').get(courseController.getCourse);
module.exports = router
