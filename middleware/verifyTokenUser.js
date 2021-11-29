const jwt = require('jsonwebtoken')

const verify = async(req , res , next) =>{

    const {token} = req.body
    if (!token)
    return res.status(403).send("A token is required for authentication");
    try {
   jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
        req.userId = decoded.id;
        req.admin = decoded.admin;
        delete req.body.token;
        next()    
    })
          } 
          catch (err) {
            return res.status(401).send("Invalid Token");
          }
}

module.exports = verify;