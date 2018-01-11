'use strict';

const Util = require('util');
const Glob = require('glob');

const internals = {
    testDefault: /\.(js)$/,
    glob: Util.promisify(Glob)
};

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const fileTest = options.test || internals.testDefault;
        const fileList = await internals.glob(options.dir);

        if (fileList.length === 0) {
            throw new Error(`No files found for path '${options.dir}' with Glob, take a look at https://github.com/isaacs/node-glob/blob/master/README.md for more info.`);
        }

        fileList.forEach((file) => {

            if (file.match(fileTest)) {
                const routeFile = require(file);

                routeFile.routes(server);
            }
        });

        server.log(['hapi-routes'], `Registered all routes in ${options.dir}`);
    }
};
