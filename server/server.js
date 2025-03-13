const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Add a root route
app.get("/home", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
