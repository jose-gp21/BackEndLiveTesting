const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader){
        const token = authHeaders.splitp(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
            if(err){
                return res.status(403).json("Invalid Token")
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not autenticated")
    }
}

module.exports = {verifyToken}