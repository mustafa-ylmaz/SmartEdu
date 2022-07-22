const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const mongoose = require('mongoose');


router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug/del').post(courseController.deleteCourse);
router.route('/:slug/update').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
module.exports = router
