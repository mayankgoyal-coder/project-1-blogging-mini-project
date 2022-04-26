const mongoose = require("mongoose")
const authorModel = require("./authorModel")
const Objectid = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    authorId : {
        type : Objectid,
        ref : "AuthorB",
        required : true
    },
    tags : [String],
    category : {
        type : [String],
        required : true
    }
})