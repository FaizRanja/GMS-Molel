const UserModel = require("../models/User.model");
const CatchAsynicHnadler = require("../utils/CatchAsynicHnadler");
const { sendToken } = require("../utils/SendToken");


const RegisterUser = CatchAsynicHnadler(async (req, res, next) => {
    const { Username, email, password } = req.body

    if (!Username || !email || !password) {
        return next(new Error("All fields are required"));
    }
    const userExists = await UserModel.findOne({ email })
    if (userExists) {
        return next(new Error("User already exists"));
    }

    const user = await UserModel.create({
        Useranme: {
            firstname,
            lastname
        }, email, password
    })
    if (user) {
        sendToken(user, 201, res)
    }
})

//  login user 

const LoginUSer = CatchAsynicHnadler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new Error("All fields are required"));
    }

    const user = await UserModel.findOne({ email }).select("+password")
    if (!user || !(await user.comparePassword(password))) {
        return next(new Error("Invalid credentials"));
    }

    sendToken(user, 200, res)
})



module.exports = { RegisterUser }