'use strict';

const Promise = require('bluebird');
const Fs = require('fs');
const Path = require('path');

const testDefault = /\.(js)$/;
const internals = {};

internals.readDir = Promise.promisify(Fs.readdir, { context: Fs });

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const fileList = await internals.readDir(options.dir);
        const fileTest = options.test || testDefault;

        for (let i = 0; i < fileList.length; ++i) {

            const file = fileList[i];

            if (file.match(fileTest)) {
                const modulePath = Path.join(options.dir, file);
                const routeFile = require(modulePath);

                routeFile.routes(server);
            }
        }

        server.log(['hapi-routes'], `Registered all routes in ${options.dir}`);
    }
};
