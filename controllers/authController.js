const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    console.log(req.body);
    const user = await User.create(req.body);

    try {
        res.status(201).json({
            user,
            status: 'success'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.loginUser =  (req, res) => {
    try {
      const { email, password } = req.body;
  
       User.findOne({ email }, (err, user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, same) => {
            if (same) {
              // USER SESSION

              req.session.userID = user._id
              res.status(200).redirect('/users/dashboard');
            }
          });
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };


  exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }

  exports.getDashboardPage = async(req, res) => {
    const user = await User.findById(req.session.userID);
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user
    });
  }
