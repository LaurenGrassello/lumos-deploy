const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'house'
    }
}, { timestamps: true });


UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(val => this.confirmPassword = val)

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next()
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports.User = mongoose.model('User', UserSchema);

