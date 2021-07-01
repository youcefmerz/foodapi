const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = authMid = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Unauthorized, please login first');

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(user._id);
        let user1 = req.user
        res.status(200).json({user1});
        next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
};
