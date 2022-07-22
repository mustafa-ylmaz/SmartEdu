const mongoos = require('mongoose');
const Schema = mongoos.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    },
    courses: [{
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Course'
    }],

});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err)
                user.password = hash;
                next();
            });


        })
    }
});

const User = mongoos.model('User', UserSchema);

module.exports = User;