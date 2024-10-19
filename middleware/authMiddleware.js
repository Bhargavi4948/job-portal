const jwt = require('jsonwebtoken');
const Company = require('../models/company');

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized access');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.company = await Company.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

module.exports = authenticate;
