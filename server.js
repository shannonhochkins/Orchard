var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/app'));

// Setup our custom routing for angularjs
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});
// Setup custom routing for individual pages
app.get('/page/:name', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});
// Setup requests for files, specifically static data.
app.get('/static/:file', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/static-data/' + req.params.file));
});
// Finally, catch all other requests as a 404 (angular js handles this 404 content)
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

var server = app.listen(app.get('port'), function() {
    console.log('Server running and listening on port %d', app.get('port'));
});