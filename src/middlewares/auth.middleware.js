const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/token.model')

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Error 401 bad authentication gateway"
        })
    }

    const tokenBlackListed = await tokenBlackListModel.findOne({token})

    if(tokenBlackListModel){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports = {authUser};