const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema ({
    fname : {
        required :  true,
        type : String
    },
    lname : {
        required : true,
        type : String
    },
    title : {
        type : String,
        required :  true,
        enum : ["Mr", "Mrs", "Miss"]
    },
    email : {
        type : String,
        required : true,
        validate:{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model("AuthorB", authorSchema)
  