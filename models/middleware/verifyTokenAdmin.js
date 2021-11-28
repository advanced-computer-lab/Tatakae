const jwt = require('jsonwebtoken')

const verify = async(req , res , next) =>{

    const {token} = sessionStorage.getItem('token')
    if (!token)
    return res.status(403).send("A token is required for authentication");
    try {
    const decoded = jwt.verify(token,process.env,(err,user)=>{
        req.id = decoded.id;
        req.admin = decoded.admin;
        if (admin)
        return next();
        else 
        return res.status(401).send("Unauthorized");
    })
          } 
          catch (err) {
            return res.status(401).send("Invalid Token");
          }
}

module.exports = verify;