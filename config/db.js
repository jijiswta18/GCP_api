const mysql = require('mysql')

// Create connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'gcp_db'
//   });
  
  // Connect
//   connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database');
//   });

// connection.end()

const db = mysql.createPool({
    connectionLimit : 10,
    host      : 'localhost',
    port      : '3306',
    user      : 'root',
    password  : '',
    database  : 'gcp_db', 
    // ssl       : true,
    ssl       : false,
    debug     : false
  })


// ทำการเชื่อมต่อกับฐานข้อมูล 
// db.connect((err) =>{
//     if(err){ // กรณีเกิด error
//         console.error('error connecting: ' + err.stack)
//         return
//     }
//     // console.log('connected as id ' + db.threadId)
// })
// ปิดการเชื่อมต่อฐานข้อมูล MySQL ในที่นี้เราจะไม่ให้ทำงาน
// db.end() 
module.exports = db