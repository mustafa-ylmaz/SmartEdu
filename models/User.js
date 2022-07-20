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
        enum: ["student","teacher","admin"],
        default: "student"
    }

});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;
        next();
    });
});

const User = mongoos.model('User', UserSchema);

module.exports = User;