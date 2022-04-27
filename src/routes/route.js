const express = require ("express");
const router = express.Router();



const authorController = require("../controllers/authorController")
const blogController = require ("../controllers/blogController")


//router.post("/createAuthor",authorController.createAuthor)
//router.post("/createBlog", blogController.createBlog)
//router.get("/getBlogs",blogController.getBlogs)

//router.delete("/blogs/:blogId",blogController.blogGetData)
module.exports=router