
require('dotenv').config();
const mysql = require('mysql')

const db = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = db;



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