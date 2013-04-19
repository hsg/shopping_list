var express  = require('express');
var http     = require('http');
var fs       = require('fs');
var stylus   = require('stylus');
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

	var path = req.params[0].replace(/^\//, '') || 'index.html';

	if (/.css$/.test(path)) {
		path = 'client/' + path.replace(/\.css$/, '.styl');
		var str = fs.readFileSync(path, 'utf8');
		stylus(str).set('filename', path).include(require('nib').path).render(function(err, data) {
			if (err) throw err;
			res.set('Content-Type', 'text/css');
			res.send(data);
			// fs.writeFileSync(path.replace(/\.styl$/, '.css'), data);
		});
	} else if (/.html$/.test(path)) {
		path = path.replace(/\.html$/, '.jade');
		res.render(path);
	}

});

http.createServer(app).listen(app.get('port'), function() {
	return console.log('Express server listening on port ' + app.get('port'));
});
