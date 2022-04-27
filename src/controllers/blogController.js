const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let author_id = req.body.author;
      if (!author_id) res.send({ msg: "Author Id is required" });
      let id = await authorModel.findById(author_id);
      if (!id) res.status(401).send({ msg: "Invalid author id" });
      let savedData = await blogModel.create(data);
      res.status(201).send({ msg: savedData });
    } else res.status(400).send({ msg: "BAD REQUEST" });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};
module.exports.createBlog = createBlog;

const getBlogs = async function (req, res) {
  try {
    data = req.query;
    const blogs = await blogModel.find({
      $and: [data, { isDeleted: false }, { isPublished: true }],
    });
    if (blogs.length == 0) {
      return res.status(404).send({ status: false, msg: "no blogs" });
    }
    return res.status(200).send({ status: true, data: blogs });
  } catch (err) {
    res.send({ status: false, err: err.message });
  }
};

module.exports.getBlogs = getBlogs;

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let Details = await blogModel.find({ _id: blogId, isDeleted: false });
    if (!Details.length)
      return res.status(400).send({ status: false, msg: "Data is incorrect" });
    // res.send({data:Details})

    let { title, body, tags, subcategory } = req.body;
    let newBlog = await blogModel
      .findOneAndUpdate(
        { Details },
        {
          $push: { subcategory: subcategory, tags: tags },
          title: title,
          body: body,
          isPublished: true,
          publishedAt: Date.now(),
        },
        { new: true }
      )
      .populate("authorId");
    res.status(200).send({ status: true, data: newBlog });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

module.exports.updateBlog = updateBlog;
