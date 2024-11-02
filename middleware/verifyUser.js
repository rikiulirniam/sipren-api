const jwt = require("jsonwebtoken");

class Verify{
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
            if(err) return res.status(403).json({message: "anda harus login"});
            req.user = decoded;
            next();
        })
    }

    static verifyLevel = (req, res, next) => {

        const user = req.user;
        if (user.level === 1) {
            return next(); 
        } else {
            return res.status(403).json({ message: "Akses hanya untuk Admin" }); // Jika level bukan 1, kembalikan status 403 (Forbidden)
        }
    }
}

module.exports = Verify