const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title: { type: String, required: 'Blog title is required', trim: true },
    body: { type: String, required: 'Blog body is required', trim: true },
    authorId: { type: ObjectId, refs: "Author", required: 'Blog author is required' },
    tags: [{ type: String, trim: true }],
    category: { type: [String], required: 'Blog category is required', trim: true },
    subcategory: { type: [String], trim: true },
    Ispublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: null },
    IsDeleted: { default: false, type: Boolean },
    deletedAt: { type: Date, default: null },
}, { timestamps: true })


module.exports = mongoose.model("Blog", blogSchema, 'blogs')