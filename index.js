const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
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

var getJSfunction = (req, res) => {
    var filePath = req.originalUrl.replace('/', ''); 
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
};

var postJSFunction = (req, res) => {
    console.log(`query d: ${req.query.d}`) ;
    
    res.send({token : 'helloMoto'});
};



app.get('/jsfile.js', getJSfunction);
app.get('/anotherJSfile.js', getJSfunction);


app.post('/jsfile.js', postJSFunction);
app.post('/anotherJSfile.js', postJSFunction);

app.listen(port, () => {
    console.log("Listen in port 3000");

}); 