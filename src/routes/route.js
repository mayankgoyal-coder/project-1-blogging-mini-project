const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const authorAuth = require("../middlewares/authorAuth")


//author routes
router.post('/authors', authorController.registerAuthor);
router.post('/login', authorController.loginAuthor);


//blog routes
 router.post('/blogs',authorAuth.authorAuth, blogController.CreateBlog);
router.get('/blogs',authorAuth.authorAuth, blogController.listBlog);
router.put('/blogs/:blogId',authorAuth.authorAuth, blogController.updateBlog);
router.delete('/blogs/:blogId',authorAuth. authorAuth, blogController.deleteBlogByID);
router.delete('/blogs',authorAuth.authorAuth, blogController.deleteBlogByParams);

module.exports =  router; 