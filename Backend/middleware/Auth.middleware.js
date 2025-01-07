const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const CatchAsynicHnadler = require("../utils/CatchAsynicHnadler")
const ApiErrHandler = require("../utils/ApiErrHandler")

const isAuthenticated = CatchAsynicHnadler(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ApiErrHandler("Please Login To acces this Resource ", 401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    res.user = await User.findById(decodedData.id)
    next()

})

module.exports = isAuthenticated