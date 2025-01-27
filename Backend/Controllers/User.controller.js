// const apifeature = require("../../components/middleware/apifeature");

const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model");
const ApiErrHandler = require("../utils/ApiErrHandler");
const CatchAsynicHnadler = require("../utils/CatchAsynicHnadler");
const sendToken = require("../utils/SendToken");

// get the register details  from the user 
// check the all firld are not empty
// add some import field for check pass lenght min
// add password  lenght max
// then the uplaod the avatar on cloudinary 
// then check the  email al ready not exict in database 
// then the finaily the user creat 
// then send the data and create the toekn and filiy send the res
exports.Register = CatchAsynicHnadler(async (req, res, next) => {
    const { Username, email, password, avatar  } = req.body;

    if (!Username || !email || !password || !avatar) {
        return next(new ApiErrHandler("Please fill all fields", 400));
    }

    if (password.length < 6) {
        return next(new ApiErrHandler("Password must be at least 6 characters long", 400));
    }

    if (password.length > 20) {
        return next(new ApiErrHandler("Password must be less than 20 characters long", 400));
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ApiErrHandler("Email already exists", 400));
    }

    let myCloud;
    try {
        myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
    } catch (error) {
        console.error("Cloudinary Upload Error: ", error);
        return next(new ApiErrHandler("Profile upload failed: " + error.message, 500));
    }

    const user = await User.create({
        Username,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user, 200, res, "User registered successfully");
});
// Controller for login User 
// get the login details from the user
// check the all feald are not empty
// check the email and password
// check the user is exict or not
// check the password is correct or not
// send the token
exports.LoginUser = CatchAsynicHnadler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ApiErrHandler('Please fill all fields', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ApiErrHandler("User nort found ", 401))
    }
    const isMatch = await user.ComparePassword(password)
    if (!isMatch) {
        return next(new ApiErrHandler("Invalid Password ", 401))
    }
    sendToken(user, 200, res, message = "User Login Successfully")
})

// controlller for change the passowrd //}

// [requiredment]
///>>//>>>>.
// get the details for the user 
// then chek the all field not empty 
// find user by id 
// then add some more middleware 
// then compare the old password 
// then set the new password 
// then send the responce 

exports.Changepassword = CatchAsynicHnadler(async (req, res, next) => {
    const { oldpassword, confirmpassword } = req.body
    if (!oldpassword || !confirmpassword) {
        return next(new ApiErrHandler("All Field all are required ", 201))
    }
    const user = await User.findById(req.user.id).select('+password')
    if (!user) {
        return next(new ApiErrHandler("User not found ", 201))
    }
    const ispassword = user.ComparePassword(oldpassword)
    if (!ispassword) {
        return next(new ApiErrHandler("Old password is not correct ", 201))
    }
    user.password = confirmpassword
    await user.save()
    sendToken(user, 200, res, message = "Password Change Successfully")
})

// controller for user logout User 


// firt of all remove the token form the cookies 

// Logout User 
exports.LougOutUser = CatchAsynicHnadler(async (req, res, next) => {
    res.cookie('token', null, {
        expire: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "User Logout Successfully"
    })
})



// controller for the update the user profile

// get update the data form the user 
// then chek the all field are not empty 
// then add some midle ware 
// chek the user authcinate 
// then find the user from data base 
// then modfly the data 

// exports.UpdateUserProfile = CatchAsynicHnadler(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//     };

//     if (req.body.avatar) {
//         const user = await User.findById(req.user.id);

//         // Delete previous avatar
//         const imageId = user.avatar.public_id;
//         await cloudinary.uploader.destroy(imageId);

//         // Upload new avatar
//         const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
//             folder: "avatars",
//             width: 150,
//             crop: "scale",
//         });

//         newUserData.avatar = {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//         };
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//     });

//     res.status(200).json({
//         success: true,
//         message: "Profile updated successfully",
//         user,
//     });
// });


// Forget Password 
// get the information for the user by body
// add error handling and chek the all field are required 
// then find the user by email 
// then check the user is exict or not 
// then send the reset password token
// send the message and responce

// exports.ForgetPassword = CatchAsynicHnadler(async (req, res, next) => {

//     const { email } = req.body
//     const user = await UserModel.findOne(email)
//     if (!user) {
//         return next(new ApiErrHandler("User not found", 404))
//     }
//     const resetToken = user.getResetPasswordToken()
//     await user.save({ validateBeforeSave: false })
//     const restpasswordurl = `${req.protocol}://${req.get("host")}//reset/password/${resetToken}`
//     const message = `Your reset password Token  is :- \n\n ${restpasswordurl} \n\n If you have not requested this email then please ignore it `
//     try {
//         email.sendEmail({
//             email: user.email,
//             subject: "Ecommerce Password Recovery",
//             message,
//         })
//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email} successfully`
//         })

//     } catch (error) {
//         user.resetPasswordToken = undefined
//         user.resetPasswordExpire = undefined
//         await user.save({ validateBeforeSave: false })
//         return next(new ErrorHandler(error.message, 500))

//     }
// })


// controller for reset password

// get the token from the params
// then find the user by token 
// then chek the token is valid or not 
// then set the new password 
// then send the responce

// exports.resetpassword = CatchAsynicHnadler(async (req, res, next) => {
//     const resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(req.params.token)
//         .digest("hex")

//     const user = await UserModel.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     })

//     if (!user) {
//         return next(new ErrorHandler("Reset Password Token is invalid or has been expired ", 400))
//     }

//     if (req.body.password !== req.body.confirmpassword) {
//         return next(new ErrorHandler("Password does not Match", 400))
//     }
//     user.password = req.body.password
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined

//     await user.save()

//     sendToken(user, 200, res)

// })
// controller for get All User by Admin
// exports.getAllUser = CatchAsynicHnadler(async (req, res, next) => {
//     const resPerPage = 10; // Results per page
//     const usersCount = await User.countDocuments(); // Count total users

//     // Initialize API features with search, filter, and pagination
//     const apiFeature = new apifeature(User.find(), req.query)
//         .search()
//         .filter()
//         .pagination(resPerPage);

//     const users = await apiFeature.query; // Execute query with features applied

//     // Respond with data
//     res.status(200).json({
//         success: true,
//         data: users,
//         message: "All users retrieved successfully",
//         usersCount,
//         currentPage: parseInt(req.query.page || "1", 10), // Fallback to page 1 if not provided
//         totalPages: Math.ceil(usersCount / resPerPage),
//     });
// });

// controller for get Single User by Admin

// exports.getUserById = CatchAsynicHnadler(async (req, res, next) => {
//     const user = await User.findById(req.params.id)
//     if (!user) {
//         return next(new ErrorHandler("User not found", 404))
//     }
//     res.status(200).json({
//         success: true,
//         data: user,
//         message: "User Get Successfully"
//     })
// })
// controller for delete single user 
// exports.deleteUser = CatchAsynicHnadler(async (req, res, next) => {
//     const user = await User.findByIdAndDelete(req.params.id)
//     if (!user) {
//         return next(new ErrorHandler("User not found", 404))
//     }

//     res.status(200).json({
//         success: true,
//         message: "User Deleted Successfully"
//     });
// });
