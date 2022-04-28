const express = require ("express");
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require ("../controllers/blogController")


router.post("/createAuthor",authorController.createAuthor)
router.post("/createBlog", blogController.createBlog)
router.get("/getBlogs",blogController.getBlogs)
router.put("/updateBlog/:blogId",blogController.updateBlog)
router.delete("/deleteBlog/:blogId",blogController.deleteBlog)
router.delete("/deleteQuery",blogController.deleteQuery)


module.exports=router