'use strict';

var fs = require('fs');
var Async = require('async');

exports.register = function (server, base_options, next) {
	fs.readdir(base_options.dir, function (err, list) {
		if (err) return next(err);
		
		Async.each(list, function (file, callback) {
			var path = process.cwd() + '/' + base_options.dir + '/' + file;
			
			var routeFile = require(path);
			
			routeFile.routes(server);
			
			callback();
		}, function () {
			server.log(['hapi-routes'], 'Registered all routes in ' + base_options.dir);
			
			return next();
		});
	});
};

exports.register.attributes = {
	pkg: require('../package.json')
};