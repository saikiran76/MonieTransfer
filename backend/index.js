const express = require("express");
const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter)

app.listen(PORT = 3000, ()=>{
    console.log("Server has been inititated")
})

