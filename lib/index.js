'use strict';

const Fs = require('fs');
const Path = require('path');
const Util = require('util');

const testDefault = /\.(js)$/;
const internals = {};

internals.readDir = Util.promisify(Fs.readdir);

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const fileList = await internals.readDir(options.dir);
        const fileTest = options.test || testDefault;

        fileList.forEach((file) => {

            if (file.match(fileTest)) {
                const modulePath = Path.join(options.dir, file);
                const routeFile = require(modulePath);

                routeFile.routes(server);
            }
        });

        server.log(['hapi-routes'], `Registered all routes in ${options.dir}`);
    }
};
