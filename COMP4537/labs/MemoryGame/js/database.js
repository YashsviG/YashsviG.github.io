// ========== Connecting to the database with credentials ==========   
const mysql = require("mysql");
let http = require('http');
let url = require('url');
const db = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b3d09d974e7428",
  password: "59280488",
  database : "heroku_29e6f69135aa750"
});
const createTable = [
  'CREATE TABLE IF NOT EXISTS score',
  '(id INT AUTO_INCREMENT PRIMARY KEY,',
  'name VARCHAR(255),',
  'score INT)'
].join(' ');
db.query(createTable,(err,result)=>{
  if(err) throw err;
  console.log('Table Created');
});
// ========== Creating server for inserting and reading from the database ==========  
let port = process.env.PORT || 8000; 
http.createServer(function(request,response){
  let q = url.parse(request.url, true);
  response.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
  let name = q.query["name"];
  let score = q.query["score"];
  connect();
  insert_data(name,score);
  read_data().then(result=> { response.end(result) })
}).listen(port);
console.log(port);


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
  var sql = "INSERT INTO score(name, score) values ('"+name+"',"+score+")";
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    
  });
}

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
