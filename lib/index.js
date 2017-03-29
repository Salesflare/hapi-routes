'use strict';

const Fs = require('fs');
const Async = require('async');
const Path = require('path');

const testDefault = /\.(js)$/;

exports.register = (server, baseOptions, next) => {

    return Fs.readdir(baseOptions.dir, (err, list) => {

        if (err) {
            return next(err);
        }

        return Async.each(list, (file, callback) => {

            // Skip files with unknown filename extension
            if (!file.match(baseOptions.test || testDefault)) {
                return callback();
            }

            const modulePath = Path.join(baseOptions.dir, file);
            const routeFile = require(modulePath);

            routeFile.routes(server);

            return callback();
        }, () => {

            server.log(['hapi-routes'], `Registered all routes in ${baseOptions.dir}`);

            return next();
        });
    });
};

exports.register.attributes = {
    pkg: require('../package.json')
};
