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

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "bxv9m1gdquz8vgzl9p8h-mysql.services.clever-cloud.com",
    user: "uweoyxmw1f7bxawj",
    password: "9uWywuOEd0gKdaQEffPU",
    database: "bxv9m1gdquz8vgzl9p8h"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;
