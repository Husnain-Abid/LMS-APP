const jwt = require('jsonwebtoken');

const isAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("token is here",token);
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token",decoded);
        req.id = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
}

module.exports = isAuthentication;