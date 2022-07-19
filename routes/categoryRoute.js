const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const mongoose = require('mongoose');

router.route('/').post(categoryController.createCategory);

module.exports = router
