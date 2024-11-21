// const mysql = require("mysql");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "19Bec4032@",
//     database: "user_auth"
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log("MySQL Connected...");
// });

// module.exports = db;

require("dotenv").config({ path: './server_env.env' }); // Specify the custom file path
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Default port for MySQL
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        throw err;
    }
    console.log("MySQL Connected...");
});

module.exports = db;
