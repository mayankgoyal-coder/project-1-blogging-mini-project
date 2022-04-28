const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel")

const authenticate = async function (req, res, next) {
    try{
        let token = req.headers["x-api-key"]
        if(!token)
        token = req.headers["x-Api-key"]
        if(!token)
        return res.status(400).send({status: false, msg: "token is mandatory"})

        let decodeToken = jwt.verify(token, "project-one")
        if(!decodeToken)
        return res.status(401).send({status: false, msg: "invalid Token"})


        next()
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({error:err.message})
    }
}


const authorise = async function(req, res, next){
    try{

        let authorId = req.query.authorId
        let author_Id = decodeToken.author_Id
        let blogId = req.params.blogId;

        let blog_Id = await blogModel.findOne({_id : blogId}).populate()

        if (blog_Id.authorId != authorId || author_Id != authorId)
        return res.status(400).send({status: false, msg : "not authorised"})


        // if(author_Id != authorId)
        // return res.status(400).send({status: false, msg : "not authorised"})

    } catch {
        res.status(500).send({status: false , msg: "err"})
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise