desc('Build static version');
task('build', function() {
	var fs = require('fs');
	var fse = require('fs-extra');
	var glob = require('glob');
	var path = require('path');
	var stylus = require('stylus');

	// Styles
	glob('**/!(_).styl', { sync: true }).forEach(function(file) {
		var loadPath = file;
		var savePath = file.replace(/\.styl$/, '.css');
		var str = fs.readFileSync(loadPath, 'utf8');
		stylus(str).set('filename', loadPath).include(require('nib').path).render(function(err, data) {
			if (err) throw err;
			fse.mkdirsSync(path.dirname(savePath));
			fs.writeFileSync(savePath, data);
		});
	});

});
