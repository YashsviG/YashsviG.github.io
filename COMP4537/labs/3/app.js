let https = require('http');
https.createServer(function(request, response){
    response.writeHead(200,{'Content-type': 'text/plain'});
    response.write("Response is coming from server...\n");
    response.end();
}).listen(8000);
console.log('listening...')
