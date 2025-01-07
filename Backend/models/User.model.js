const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


const userSchema = new mongoose.Schema({
    UserName: {
        firstName: {
            type: String,
            required: true,
            minlength: [4, "First name must be at least 4 characters long"],
            maxlength: [50, "First name can't be more than 50 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [4, "Last name must be at least 4 characters long"],
            maxlength: [50, "Last name can't be more than 50 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: "Invalid email format"
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],

    },
    password: {
        type: String,
        required: true,
        select:false    },
    socketId: {
        type: String,
    }
})

function emailValidator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,20)
    }
    
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);





