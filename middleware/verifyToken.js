const jwt = require("jsonwebtoken");

class Verify{
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return req.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.username = decoded.username;
            next();
        })
    }
}

module.exports = Verify
