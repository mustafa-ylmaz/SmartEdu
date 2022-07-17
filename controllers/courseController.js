const Course = require('../models/Course');

exports.createCourse = async (req, res) => {

    const course = await Course.create(req.body);

    try {
        res.status(201).json({
            course,
            status: 'success'
        })


    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find()

        res.status(200).render('courses', {
            courses,
            page_name: 'courses',
            status: 'success'
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getCourse = async (req, res) => {
    try {

        const course = await Course.findById(req.params.id)

        res.status(200).render('course', {
            course,
            page_name: 'course',
            status: 'success'
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
