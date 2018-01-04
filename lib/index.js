'use strict';

const Fs = require('fs');
const Path = require('path');
const Util = require('util');
const Glob = require('glob');

const internals = {
    readDir: Util.promisify(Fs.readdir),
    testDefault: /\.(js)$/,
    glob: Util.promisify(Glob)
};

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const fileTest = options.test || internals.testDefault;

        if (options.glob === true) {
            const fileList = await internals.glob(options.dir);
            fileList.forEach((file) => {

                if (file.match(fileTest)) {
                    const routeFile = require(file);

                    routeFile.routes(server);
                }
            });
        }
        else {
            const fileList = await internals.readDir(options.dir);
            fileList.forEach((file) => {

                if (file.match(fileTest)) {
                    const modulePath = Path.join(options.dir, file);
                    const routeFile = require(modulePath);

                    routeFile.routes(server);
                }
            });
        }

        server.log(['hapi-routes'], `Registered all routes in ${options.dir}`);
    }
};
