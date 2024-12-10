const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser")
const userRouter = require("./user")

const app = express();

app.use(cors());
app.use(express.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}))

const router = express.Router();

router.use("/user", userRouter)

module.exports = router;
