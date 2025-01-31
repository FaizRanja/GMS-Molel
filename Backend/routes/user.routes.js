const express =require("express")
const {  Register, LoginUser, LougOutUser, Changepassword } = require("../Controllers/User.controller")
const isAuthenticated = require("../middleware/Auth.middleware")

const router=express()


router.route("/register").post(Register)
router.route("/login").post(LoginUser)
router.route("/logout").get(LougOutUser)
router.route("/chandepassword").post( isAuthenticated,Changepassword)


module.exports=router











