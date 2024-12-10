const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { z } = require("zod");

const { JWT_SECRET } = require("../utils/config");
const User = require("../models/User");
const authMiddleware = require("../middlewares/")

const userRouter = express.Router()


const userValidationSchema = z.object({
    userName: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must not exceed 20 characters"),
    firstName: z.string().min(4).max(30),
    lastName: z.string().min(4).max(30),
});


userRouter.post('/signup', async (req, res) => {
    // get user information, do input validation using zod and store the info in DB
    try {
        const validation = userValidationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.issues });
        }

        const { userName, firstName, lastName, password } = req.body;

        const existingUser = await User.findOne({
            userName: userName
        })

        if (existingUser) {
            return res.status(411).json({
                message: "User already exists"
            })
        }

        // salt the password before storing
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            userName,
            firstName,
            lastName,
            password: hashedPassword
        })

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(200).json({
            message: "User registered successfully",
            token
        })

    } catch (err) {
        res.status(500).json({
            message: "Error while signing up!"
        })
    }

})

userRouter.post('/signin', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const existingUser = await User.findOne({
            userName: userName
        })

        if (!existingUser) {
            return res.status(401).json({
                message: "User does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({
            message: "User signed in successfully",
            token
        })

    } catch (err) {
        res.status(500).json({
            message: "Error while signin in"
        })
    }

})

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

// bulk update
userRouter.put('/bulkUpdate', authMiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);

        res.status(200).json({
            message: "Data has been updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while updating information"
        })
    }
})

// retrieval of user, filterable via firstname & lastname
userRouter.get('/bulk', async (req, res) => {
    // const { name } = req.query;
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                }
            }, {
                lastName: {
                    "$regex": filter
                }
    
            }
            ]
        })

        res.json({
            user: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.LastName,
                _id: user._id
            }))
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while fetching users"
        })
    }

    

})

module.exports = userRouter;