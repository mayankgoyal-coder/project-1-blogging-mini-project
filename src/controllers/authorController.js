const authorModel = require("../models/authorModel")

const createAuthor = async(req,res) =>{

    if (!req.body.fname || !req.body.email || req.body.password)
    return res. send("name,email,passwors are a required field")
    const savedData = await authorModel.create(req.body)
    return res.send({msg:savedData})
}
module.exports.createAuthor = createAuthor
