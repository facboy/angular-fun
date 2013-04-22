var express = require('express');
var app = express();

var port = process.argv[2] || 7000;

app.use(function(req, res, next) {
    if (!/^\/static/.test(req.url)) {
        req.url = '/index.html';
    }
    next();
});
app.use(express.static('d:/git/angular-fun'));

app.listen(port);
console.log('Listening on port %d', port);
