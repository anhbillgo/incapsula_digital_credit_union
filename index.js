const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
const app = express(); 
const port = 3000;

const fakeToken = "3:i6zf8HMjy4JWFmPYK+nfAg==:a6gZUpghKGrHyO3wY9TRK4Ks6eS+tY1Y2yw9eqrrLImuB2BkeLpoSyLF4A8MuepW3sxlBqKN1pmNT/5YtWO+ifpboQ1UlyEITpoWlNScPgQQMCv2jY0Fo9RQokJIj8EPMzL4QEbiAc2qbat3HNOiRM7kJDi/H5CRymJWNloJQ9FsVsrjVd7QaKirK2v3l8W2BY8Qvx58OStVt8Kad+0PuDpdkHhJf3EsOj4PcnKHIqgJCmS1G+tSmb9H2+AXhYy2GUpwP6XpbM3g834u5fe40Hn8zNX8M0bjy8b5Yc80K8IWFSrz1p9zeVEddYTpz0hf+tVAN5U1c5eAapdoYn+PHZbh+stZ6ddcX5olHvaAnaRPak+5KPTuuzx3TVO/Ctk1kgH/KMzPQtZQZxrZX3qkoEKpMvQwIxeICAEm6bLyJFPm0ooe/kV/etFKQ8IS1TOcbDIbzia3OsxyGUr+dgjAGQ==:uBPgfR8QQYPxPxYVpeAcJ7P3u4gpGCrlVG9O/blCdZY=";

const renewInSec = 123;

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
    var url = req.originalUrl.indexOf('?') > 0 ? req.originalUrl.split('?')[0] : req.originalUrl; 
    var filePath = url.replace('/', ''); 
    //console.log(`${filePath} \r\n ${req.originalUrl}`);
    console.log(req.query);
    if (req.query.cachebuster) {
        res.send({
            token : "olloal", 
            renewInSec : 10_077, 
            cookieDomain : "localhost"
        });
    }
    else {
        var stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Content-Length': stat.size,
        });

        var readStream = fs.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);
    }
    
};

var postJSFunction = (req, res) => {
    //console.log(`query d: ${req.query.d}`) ;
    
    res.send({
        token: fakeToken, 
        renewInSec : renewInSec, 
        cookieDomain : "localhost"
    });
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

