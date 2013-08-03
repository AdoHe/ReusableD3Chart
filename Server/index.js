var http = require('http');
var fs = require('fs');
var path = require('path');
var stream = require('stream');

var server = http.createServer(function(req, res) {
	var filePath = '.' + req.url;
	if(filePath == './')
		filePath = '../index.html';

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	
	switch(extname){
		case '.js':
			contentType = 'text/javascript';
			filePath = '.' + filePath;
			break;
		case '.css':
			contentType = 'text/css';
			filePath = '.' + filePath;
			break;
		case '.csv':
			contentType = 'text/csv';
			filePath = '.' + filePath;
			break;
		case '.tsv':
			contentType = 'text/tsv';
			filePath = '.' + filePath;
			break;
		default:
			break;
	}

	fs.exists(filePath, function(exits){
		if(exits){
			var readStream = fs.createReadStream(filePath);
			
			readStream.on('error', function(err){
				res.writeHead(500);
				res.end(String(err));
			});
			
			res.writeHead(200, {'Content-Type': contentType});
			readStream.pipe(res);
		}else{
			res.writeHead(404);
			res.end();
		}
	});
});

server.listen(8080);
console.log('The server has started at port: 8080');
