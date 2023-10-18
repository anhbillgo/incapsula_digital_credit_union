const express = require('express');
const fs = require('fs');
const app = express(); 
const port = 3000;

app.get('/', (req, res) => {
    var filePath = "index.html"; 
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

app.get('/jsfile.js', (req, res) => {
    var filePath = "jsfile.js"; 
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

app.listen(port, () => {
    console.log("Listen in port 3000");

}); 