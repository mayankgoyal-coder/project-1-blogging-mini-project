const authorModel = require("../models/authorModel")

const createAuthor = async(req,res) =>{
try{
    if (!req.body.fname || !req.body.email || !req.body.password)
    return res. send("name,email,passwors are a required field")
    const savedData = await authorModel.create(req.body)
    return res.status(201).send({msg:savedData})
}
catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });

}
}
module.exports.createAuthor = createAuthor
