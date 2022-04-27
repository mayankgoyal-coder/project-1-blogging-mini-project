const authorModel = require("../models/authorModel")

const createAuthor = async(req,res) =>{
    try{
        if (!req.body.fname || !req.body.email || !req.body.password)
        return res.send("name,email,passwords are a required field")
        console.log("hi")
        const savedData = await authorModel.create(req.body)
        console.log("2nd hi")
        return res.send({msg:savedData})
    }catch(error){
        return res.send({status: false, message: error.message})
    }
}
module.exports.createAuthor = createAuthor
