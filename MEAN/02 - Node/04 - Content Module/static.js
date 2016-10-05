var path = require('path');
var fs   = require('fs');

module.exports = function(request, response) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './views/index.html';

    var extname = path.extname(filePath);
    var contentType;

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        default:
            contentType = 'text/html';
    }

    if( filePath.indexOf('private/') > -1 ) {
        response.end('Sorry! You can\'t access this file.');
        response.end();

    } else {
        fs.readFile(filePath, function(error, content) {
            if( error ) {
                console.log(error);

                if( error.code == 'ENOENT' ){
                    fs.readFile('./views/404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });

                } else {
                    response.writeHead(500);
                    response.end('Sorry! Something went wrong.\n' + error.code);
                    response.end();
                }

            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
};
