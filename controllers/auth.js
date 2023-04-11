const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken(res);
    res.status(statusCode).json({ success: true, token });

}

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    const existing_user = await User.findOne({ email });

    if (existing_user) {
        return next(new ErrorResponse('User already exists', 400));
    }

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        sendToken(user, 201, res);
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and/or password', 400));
    }

    try { 
        //check that user already exists by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }


        //check that password matches
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res) => {
    // Add a line to clear the auth token
    const token = req.headers.authorization;

    // Rest of your code
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: 'Logged out' });
};

exports.getRefreshToken = async (req, res) => {
    try {
        const getToken = req.cookies.refreshToken;

        if (getToken) {
            const token = jwt.verify(getToken, process.env.JWT_REFRESH_SECRET);
            const accessToken = jwt.sign({ id: token.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
            res.status(200).json({ success: true, accessToken });
        }

    } catch {
        next(err);
    }
};


