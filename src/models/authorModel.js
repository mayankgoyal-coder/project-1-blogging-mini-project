const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    fname: {
        required: 'first name is required',
        type: String,
        trim: true
    },
    lname: {
        required: 'last name is required',
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: 'title is required',
        enum: ["Mr", "Mrs", "Miss","Mast"]
    },
    email: {
        type: String,
        required: 'email address is required',
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: 'password is required',
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Author", authorSchema,"authors")
