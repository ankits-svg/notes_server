const jwt = require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    // console.log("reqqqq:",req.header)
    const token=req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'pract');
        console.log("dec:",decoded)
        if(decoded){
            req.body.userID = decoded.userID;
            next();
        }else{
            res.status(400).send({'msg':"Plese login first"})
        }
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports={
    authMiddleware
}