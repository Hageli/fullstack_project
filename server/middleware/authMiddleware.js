import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        // CHECK IF TOKEN EXISTS
        let token = req.header("Authorization");
        if(!token) {
            return res.status(403).send("Access denied");
        }

        // REMOVE BEARER PART FROM TOKEN
        if(token.startsWith("Bearer ")) {
            token = token.split(' ')[1];
        }

        // VERIFY THE TOKEN
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ message: "User verification failed", error: err.message })
    }
}