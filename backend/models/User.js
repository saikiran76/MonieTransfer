const mongoose = require("mongoose");
// const { z } = require("zod"); 

// const user = z.object({
//     userName: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(6, {"message":"Password nust be atleast 6 characters long"}).max(20, {"message":"Password must no exceed 20 characters"}),
//     firstName: z.string().min(4).max(30),
//     lastName: z.string().min(4).max(30)
// })

const userSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    },
    password: { type: String, required: true, minlength: 6, maxlength: 20 },
    firstName: { type: String, required: true, minlength: 4, maxlength: 30 },
    lastName: { type: String, required: true, minlength: 4, maxlength: 30 },
});

// const userSchema = new mongoose.Schema(user)

//User model

const User = mongoose.model("User", userSchema);

module.exports = [
    User
]