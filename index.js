const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
const app = express(); 
const port = 3000;

app.get('/', (req, res) => {
    var filePath = "index.html"; 
    var stat = fs.statSync(filePath);

    //Remember JS cannot read cookies which are marked httpOnly=true, there for only incap_ses_515_2804237 is being used for payload
    res.cookie("incap-resubmit-token", "9JGcsJcNOWE=:e4lVNRTrdEiOjqDlqsk8HN/UKzZEmN4KOoxetchZQ7k=", {httpOnly: true});
    res.cookie("incap_ses_515_2804237", "pyGhTeNhkQqhH6WO2qYlByzMMmUAAAAAIdrkRcJmEygvJrtoDYrNQg==", {httpOnly: false});
    res.cookie("visid_incap_2804237", "nlrR1jYCScGxXTPAfQKVgSzMMmUAAAAAQUIPAAAAAABlQEYTf+mjzDgcEENWVHDt", {httpOnly: false});

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
        'Content-Length': stat.size,
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
};

var postJSFunction = (req, res) => {
    console.log(`query d: ${req.query.d}`) ;
    
    res.send({token : 'helloMoto'});
};


//GET list
app.get('/jsfile.js', getJSfunction);
app.get('/anotherJSfile.js', getJSfunction);
app.get('/anotherJS2.js', getJSfunction);

//POST list
app.post('/jsfile.js', postJSFunction);
app.post('/anotherJSfile.js', postJSFunction);
app.post('/anotherJS2.js', postJSFunction);

app.listen(port, () => {
    console.log("Listen in port 3000");
}); 


//_Incapsula_Resource
app.get('_Incapsula_Resource', (req, res) => {
    //console.log();

}); 

