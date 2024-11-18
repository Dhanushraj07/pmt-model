const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).json({ message: "User already exists" });
    
            // You can use result.insertId to get the ID of the newly inserted user
            res.status(201).json({ message: "User created", userId: result.insertId });
        }
    );
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: "User not found" });
        
        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
            
            // Send token and username to the frontend
            res.json({ message: "Sign in successful", token,userid:user.id,username: user.username });
            console.log("Username :",user);
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    });
};

exports.punchIn = (req, res) => {
    const { userId } = req.body;
    const punchInTime = new Date();
  
    db.query(
      "INSERT INTO attendance (user_id, punchin) VALUES (?, ?)",
      [userId, punchInTime],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error logging punch-in" });
  
        res.status(200).json({ message: "Punch-in successful", punchInTime });
      }
    );
  };
  
  exports.punchOut = (req, res) => {
    const { userId } = req.body;
    const punchOutTime = new Date();
  
    db.query(
      "UPDATE attendance SET punchout = ? WHERE user_id = ? AND punchout IS NULL ORDER BY id DESC LIMIT 1",
      [punchOutTime, userId],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error logging punch-out" });
  
        res.status(200).json({ message: "Punch-out successful", punchOutTime });
      }
    );
  };
  
