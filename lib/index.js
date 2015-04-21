'use strict';

var Fs = require('fs');
var Async = require('async');

exports.register = function (server, baseOptions, next) {

    return Fs.readdir(baseOptions.dir, function (err, list) {

        if (err) {
            return next(err);
        }

        return Async.each(list, function (file, callback) {

            var path = process.cwd() + '/' + baseOptions.dir + '/' + file;

            var routeFile = require(path);

            routeFile.routes(server);

            return callback();
        }, function () {

            server.log(['hapi-routes'], 'Registered all routes in ' + baseOptions.dir);

            return next();
        });
    });
};

exports.register.attributes = {
    pkg: require('../package.json')
};
