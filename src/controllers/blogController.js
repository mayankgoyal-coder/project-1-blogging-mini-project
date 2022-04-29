const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let author_id = req.body.authorId;
      if (!author_id)
        return res.status(404).send({ msg: "Author Id is required" });
      let id = await authorModel.findById(author_id);
      if (!id) res.status(404).send({ msg: "Invalid author id" });
      if (data.published == true) {
        data.publishedAt = moment().format();
      }
      let savedData = await blogModel.create(data);
      res.status(201).send({ status: true, data: savedData });
    } else res.status(400).send({ msg: "No key entered" });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

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
    res.status(500).send({ status: false, err: err.message });
  }
};

const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let Details = await blogModel.findById(blogId);
    if (Details.isDeleted == true)
      return res
        .status(404)
        .send({ status: false, msg: "Blog already deleted" });

    let { title, body, tags, subcategory, category, published } = req.body;
    let update = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      {
        $push: { category: category, subcategory: subcategory, tags: tags },
        title: title,
        body: body,
      },
      { new: true }
    );

    if (req.body.published == true && Details.published == false) {
      let finalUpdate = await blogModel.findByIdAndUpdate(
        { _id: blogId },
        {
          published: true,
          publishedAt: moment().format(),
        },
        { new: true }
      );
      update = finalUpdate;
    }

    return res.status(200).send({ status: true, data: update });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    if (!blogId)
      return res
        .status(400)
        .send({ status: false, msg: "BlogId is mandatory" });

    let deleteData = await blogModel.findById({ _id: blogId });
    if (!deleteData) return res.status(404).send({ msg: "Invalid blogId" });

    if (deleteData.isDeleted == true)
      return res.status(404).send({ msg: "User already deleted" });
    let updateDelete = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { isDeleted: true, deletedAt: moment().format() },
      { new: true }
    );
    if (updateDelete)
      res.status(200).send({ status: true, data: updateDelete });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

const deleteQuery = async function (req, res) {
  try {
    let token = req.headers["x-api-key"];
    let decode = jwt.verify(token, "project-one");

    let anyData = req.query;
    let obj = await blogModel.find(anyData);

    console.log(obj);

    let output = [];
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].authorId == decode.author_Id) {
        output.push(obj[i]);
      }
    }

    console.log(output);

    if (!output.length)
      return res.status(400).send({ status: false, msg: "BAD REQ" });

    for (let j = 0; j < output.length; j++) {
      let delData = await blogModel.updateMany(
        { authorId: output[j].authorId },
        { isDeleted: true, deletedAt: Date.now() },
        { new: true }
      );

      output = delData;
    }
    res.status(200).send({ status: true, data: output });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteQuery = deleteQuery;
