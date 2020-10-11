let http = require('http');
let url = require('url');
let dt = require('./myModule');
const port = process.env.PORT || 5000;

http.createServer(function (request, response) {
  var query = url.parse(request.url, true);
  var queryData = query.query;
 
  console.log("The server received a request");
  response.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
  response.end("Hi " + queryData.name + "!, current server time is " + dt.myTime());
}).listen(port);

console.log('Server is running and listening ...', port);