const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/"

mongoose.connect(dbUrl);

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     }
// });
// const userSchema = new mongoose.Schema({
//     user: string,
//     password: string,
//     firstName: string,
//     lastname: string
// })

// //User model

// const User = mongoose.model("User", userSchema);

// module.exports = [
//     User
// ];