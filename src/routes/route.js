const express = require ("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

const authorController = require("../controllers/authorController")
const blogController = require ("../controllers/blogController")
const middleware = require("../middlewares/auth")


router.post("/createAuthor", authorController.createAuthor)

router.post("/login",authorController.login)

router.post("/createBlog", middleware.validate, blogController.createBlog)
router.get("/getBlogs",middleware.validate, blogController.getBlogs)
router.put("/updateBlog/:blogId",middleware.validate, blogController.updateBlog)
router.delete("/deleteBlog/:blogId",middleware.validate, blogController.deleteBlog)
router.delete("/deleteQuery", middleware.validate, blogController.deleteQuery)



module.exports=router