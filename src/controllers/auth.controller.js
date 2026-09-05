const userModel = require('../models/user.model');
const tokenBlackListModel = require('../models/token.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({          // ✅ added return
            message: "Enter Username, Email and Password"  // ✅ fixed typo: "messsage"
        });
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({          // ✅ added return
            message: "User Already Exists with username or email"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(                    // ✅ jwt.sign is sync, no need for await
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true }); // ✅ httpOnly for security

    return res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    });
}


async function loginUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please Provide Email and Password"
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "Email not registered"
        });
    }                                          // ✅ closed the if block here

    const isUserValid = await bcrypt.compare(password, user.password);

    if (!isUserValid) {
        return res.status(401).json({
            message: "Incorrect Password"
        });
    }

    const token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true }); // ✅ httpOnly for security

    return res.status(200).json({
        message: "User LoggedIn Successfully",  // ✅ fixed typo: "LoggdIn"
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


async function logoutUserController(req, res) {
    const token = req.cookies.token           // ✅ fixed: was req.body.cookie
                                               // ✅ added const (was implicit global)
    if (!token) {
        return res.status(401).json({          // ✅ proper status code
            message: "Login to Logout"
        });
    }

    await tokenBlackListModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
        message: "User Logged Out Successfully"
    });
}

async function getMeController(req,res) {
    
    const user = await userModel.findById(req.user._id)

    return res.status(200).json({
        message: "User Details fetched Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};