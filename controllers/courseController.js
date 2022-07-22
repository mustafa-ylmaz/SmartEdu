const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {

    const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID
    });

    try {
        res.status(201).redirect('/courses');


    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const category = await Category.findOne({
            slug: categorySlug
        });
        const query = req.query.search;


        let filter = {};

        if (categorySlug) {
            filter.category = category._id;
        }
        if (query) {
            filter = {
                name: query
            };
        }

        if (!query && !categorySlug) {
            filter.name = "",
            filter.category = null;
        }

        const courses = await Course.find({
            $or: [{
                    name: {
                        $regex: '.*' + filter.name + '.*',
                        $options: 'i'
                    }
                },
                {
                    category: filter.category
                }
            ]
        }).sort('-createdAt');
        const categories = await Category.find()
        res.status(200).render('courses', {
            courses,
            categories,
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
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({
            slug: req.params.slug
        }).populate('user');

        res.status(200).render('course', {
            course,
            page_name: 'course',
            status: 'success',
            user
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.enrollCourse = async (req, res) => {
    try {

        const user = await User.findById(req.session.userID);
        await user.courses.push({
            _id: req.body.course_id
        });
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};



exports.releaseCourse = async (req, res) => {
    try {

        const user = await User.findById(req.session.userID);
        await user.courses.pull({
            _id: req.body.course_id
        });
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};