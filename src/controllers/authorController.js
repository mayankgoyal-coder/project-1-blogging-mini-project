const authorModel = require("../models/authorModel");

const createAuthor = async (req, res) => {
  try {
    if (!req.body.fname || !req.body.email || !req.body.password)
      return res.status(400).send("name,email,passwords are a required field");
    //console.log("hi");
    const savedData = await authorModel.create(req.body);
    //console.log("2nd hi");
    return res.status(200).send({ msg: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.createAuthor = createAuthor;
