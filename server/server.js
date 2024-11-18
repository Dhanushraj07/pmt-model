const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
// app.use('/home',(req,res)=>{
//     res.send('<h1>Hello</h1>')
// })
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
