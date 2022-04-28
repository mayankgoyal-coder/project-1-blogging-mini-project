const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    authorId : {
        type : ObjectId,
        ref : "AuthorB",
        required : true
    },
    tags : [String],
    category : {
        type : [String],
        required : true
    },
    subcategory : {
        type : [String],
        required : true
    },
    published : {
        type : Boolean,
        default : true
    },
    publishedAt : Date,
    isDeleted : {
        default : false,
        type : Boolean
    },
    deletedAt : Date
}, {timestamps : true})


module.exports = mongoose.model("Blog", blogSchema)