const express =require("express")
const {  Register, LoginUser, LougOutUser } = require("../Controllers/User.controller")

const router=express()


router.route("/register").post(Register)
router.route("/login").post(LoginUser)
router.route("/logout").get(LougOutUser)


module.exports=router











