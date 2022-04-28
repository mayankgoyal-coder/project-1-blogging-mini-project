const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken")

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


const login = async function(req,res){
    try{
        let data = req.body
        let{email,password} = data

        if(!email)
        return res.status(404).send({status:false,msg:"email id is missing"})
        
        if(!password)
        return res.status(404).send({status:false,msg:"password is missing"})

        let author = await authorModel.findOne({email:email, password:password})
        if(!author)
        return res.status(404).send({status:false,msg:"invalid email or password"})

        let token = jwt.sign({
            author_Id : author._id.toString()
        }, "project-one");

        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, data: token });

    }
    catch(err){
        console.log(err.message)
        res.status(500).send({error:err.message})

    }
}


module.exports.createAuthor = createAuthor;
module.exports.login = login
