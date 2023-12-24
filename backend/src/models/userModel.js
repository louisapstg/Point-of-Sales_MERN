import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    photo: {
        type: String,
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+62"
    },
    bio: {
        type: String,
        maxlength: [250, "Bio must be at most 250 characters"],
        default: "Bio is empty"
    },
}, {
    timestamps: true
})

// Hash password before saving to database
userScheme.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(this.password, salt);
    this.password = password;
    next();
})

const User = mongoose.model("User", userScheme);
export default User;