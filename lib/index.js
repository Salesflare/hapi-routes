'use strict';

const Fs = require('fs');
const Async = require('async');

exports.register = (server, baseOptions, next) => {

    return Fs.readdir(baseOptions.dir, (err, list) => {

        if (err) {
            return next(err);
        }

        return Async.each(list, (file, callback) => {

            const path = process.cwd() + '/' + baseOptions.dir + '/' + file;
            const routeFile = require(path);

            routeFile.routes(server);

            return callback();
        }, () => {

            server.log(['hapi-routes'], 'Registered all routes in ' + baseOptions.dir);

            return next();
        });
    });
};

exports.register.attributes = {
    pkg: require('../package.json')
};
