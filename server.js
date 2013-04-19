var express  = require('express');
var http     = require('http');
var fs       = require('fs');
var app      = express();

app.configure(function() {
	app.set('port', process.env.PORT || 4000);
	app.set('views', 'client');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express['static']('client'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('*', function(req, res) {
	var path = req.params[0].replace(/^\//, '').replace(/\.html$/, '.jade') || 'index.jade';
	if (fs.existsSync(app.get('views') + '/' + path)) {
		res.render(path);
	} else {
		res.send(404);
	}
});

http.createServer(app).listen(app.get('port'), function() {
	return console.log('Express server listening on port ' + app.get('port'));
});
