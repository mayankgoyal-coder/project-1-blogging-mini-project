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
      const data = await blogModel.find({
        isDeleted: false,
        isPublished: false,
      });
      if (!data == data) return res.send({ status: false });
      else {
        res.send({ status: true, msg: data });
      }
    } catch (err) {
      res.send({ status: false, err: err.message });
    }
  };

  module.exports.getBlogs = getBlogs;