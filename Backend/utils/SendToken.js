const { options } = require("../app");

exports.sendToken = (user, statuscode, res) => {
    const token = user.generateAuthToken()
    const cookiesExpire = process.env.COOKIE_EXPIRE ? parseInt(process.env.COOKIE_EXPIRE) : 7;
}
// Cookies Option 
const Option = {
    expires: new Date(Date.now() + (cookiesExpire * 24 * 60 * 60 * 1000)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
}

// set the cookies and responce

res.status(statuscode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        user: user._id,
        expiresIn: cookiesExpire * 24 * 60 * 60,
    })






