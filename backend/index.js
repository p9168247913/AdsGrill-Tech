require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connection = require("./config/db");
const userRouter = require("./routes/authRoutes");

const app =  express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/api/user", userRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Mongo Atlas");
  } catch (err) {
    console.log(err)
    console.log("Couldn't connect to Mongo Atlas");
  }
  console.log(`Server started on port ${process.env.port}`);
});
