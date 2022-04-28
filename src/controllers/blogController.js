const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let author_id = req.body.authorId;
      if (!author_id) res.send({ msg: "Author Id is required" });
      let id = await authorModel.findById(author_id);
      if (!id) res.status(401).send({ msg: "Invalid author id" });
      if(published== true){
        published = new Date.now
      }
      let savedData = await blogModel.create(data);
      res.status(201).send({ msg: savedData });
    } else res.status(400).send({ msg: "BAD REQUEST" });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};
module.exports.createBlog = createBlog;

// const getBlogs = async function (req, res) {
//     try {
//       const data = await blogModel.find({
//         isDeleted: false,
//         isPublished: false,
//       });
//       if (!data == data) return res.send({ status: false });
//       else {
//         res.send({ status: true, msg: data });
//       }
//     } catch (err) {
//       res.send({ status: false, err: err.message });
//     }
//   };

const getBlogs = async function (req, res) {
  try{
    
    data = req.query
    
    if(Object.keys(data) == 0){return res.status(404).send({status : false, msg: "Fill details"})}

    const blogs = await blogModel.find({$and: [data, {deleted: false}, {published: true}]})

    if (blogs.length == 0){return res.status(404).send({status: false, msg : "no blogs"})}

    return res.status(200).send({status: true, data: blogs})

  } catch(err) {

    res.send({status: false, err: err.message})
    
  }
}

  module.exports.getBlogs = getBlogs;