// ========== Connecting to the database with credentials ==========   
const mysql = require("mysql");
let http = require('http');
let url = require('url');
const db = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b2a0de87db0290",
  password: "084aed0a",
  database : "heroku_a332eebd72b6445"
});
// mysql://b2a0de87db0290:084aed0a@us-cdbr-east-02.cleardb.com/heroku_a332eebd72b6445?reconnect=true


function connect(){
  db.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Connected to MySQL");    
});

}

// ========== Inserting data--> score, name into the database ==========   
function insert_data(name,score){
  //var sql = "INSERT INTO score(name, score) values ('"+name+"',"+score+")";
  const createTable = 'SELECT * FROM score';
  db.query(createTable,(err,result)=>{
    if(err) throw err;
    console.log('Table display');
  });
  // db.query(createTable, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
    
  // });
}

insert_data("Yashi",20);
// ========== Reading data--> score, name from the database ==========   
function read_data(){
  let sql_read = "SELECT DISTINCT score,name FROM score ORDER BY score DESC LIMIT 5 ;";
  return new Promise((resolve, reject) => {
  db.query(sql_read, (err, result) => {
    console.log(result);
      resolve(JSON.stringify(result));
    });
  });
}

db.end(err =>{
  if(err) throw err;
  console.log('Closed database connection.');
  process.exit();
});