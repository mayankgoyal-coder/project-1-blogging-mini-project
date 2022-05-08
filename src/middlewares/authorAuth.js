const jwt = require('jsonwebtoken')
const blogController = require("../controllers/blogController")


const authorAuth = async(req,res,next) =>{
    try{
        const token = req.header('x-api-key')
        if(!token){
            res.status(403).send({status:false, message:`Missing authentication token in request`})
            return;
        }

        const decoded = await jwt.verify(token,`someverysecuredprivatekey291@(*#*(@(@()`)  //secret key

        if(!decoded) {
            res.status(403).send({status: false, message: `Invalid authentication token in request`})
            return;
        }
        req.authorId = decoded.authorId;

        next()
    }catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({status: false, message: error.message})
    }
}
module.exports = {authorAuth}

// const jwt = require("jsonwebtoken");
// const blogModel = require("../models/blogModel");

// const authenticate = async function (req, res, next) {
//   try {
//     let token = req.headers["x-api-key"];
//     if (!token) token = req.headers["x-Api-key"];
//     if (!token)
//       return res.status(400).send({ status: false, msg: "token is mandatory" });

//     let decodeToken = jwt.verify(token, "project-one");
//     if (!decodeToken)
//       return res.status(401).send({ status: false, msg: "invalid Token" });

//     next();
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ error: err.message });
//   }
// };

// const authorise = async function (req, res, next) {
//   try {
//     let token = req.headers["x-api-key"];
//     let decodeToken = jwt.verify(token, "project-one");

//     let author_Id = decodeToken.author_Id;
//     let pathBlog = req.params.blogId;
//     let queryData = req.query;


//     if (pathBlog) {
//       let pathAuthors = await blogModel.findById({ _id: pathBlog }).select({ authorId: 1, _id: 0 });
//       if (pathAuthors != author_Id)
//         return res
//           .status(400)
//           .send({ status: false, msg: "user not authorised" });
//     } else {
//       let queryAuthors = await blogModel.find({
//         $and: [queryData, { authorId: author_Id }],
//       });

//       if (!queryAuthors.length)
//         return res
//           .status(400)
//           .send({ status: false, msg: "No data matching your request" });

//       let checkData;

//       for (let i = 0; i < queryAuthors.length; i++) {
//         checkData = queryAuthors[i].authorId;

//         if (checkData != author_Id)
//         return res
//           .status(400)
//           .send({ status: false, msg: "user not authorised" });
//       }

      
//     }

//     next();
//   } catch {
//     res.status(500).send({ status: false, msg: "err" });
//   }
// };


// module.exports.authenticate = authenticate;
// module.exports.authorise = authorise;
