const jwt = require('jsonwebtoken');
const Role = require('../models/Role');


module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).send("Access denied");
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) {
            return res.status(403).send("Invalid token");
        } else {
            req.user = user;
        }
        next();
    });
}

module.exports.verifyAdmin = (req, res, next) => {
    this.verifyToken(req, res, async () => {
        const tempRole =  await Role.findOne({role: "Admin"});
        if(tempRole._id.toString() === req.user.user.roles[0]) {
            next();
        } else {
            res.status(403).send("Admin access required");
        }
    })
}
