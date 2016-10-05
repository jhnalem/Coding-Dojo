var http = require('http');
var fs   = require('fs');

var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if (request.url === "/cars.html" || request.url === "/cars") {
         fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });

    } else if (request.url === "/cars/new.html" || request.url === "/cars/new") {
         fs.readFile('./views/new_car.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });

    } else if (request.url === "/cats.html" || request.url === "/cats") {
         fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents);
             response.end();
         });

    } else if(request.url === '/stylesheets/styles.css'){
        fs.readFile('./stylesheets/styles.css', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        });

    } else if(request.url === '/images/cat.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        });

    } else if(request.url === '/images/car.gif'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/car.gif', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/gif'});
            response.write(contents);
            response.end();
        });

    } else {
        response.end('File not found.');
    }
});

server.listen(6789);
