'use strict';

const Fs = require('fs');
const Util = require('util');
const Glob = require('glob');

const internals = {
    testDefault: /\.(js)$/,
    glob: Util.promisify(Glob),
    checkPath: (path) => {

        const chunk = path.replace(/[\/\*]+$/, '');
        return Util.promisify(Fs.exists)(chunk);
    }
};

module.exports = {
    pkg: require('../package.json'),
    register: async (server, options) => {

        const fileTest = options.test || internals.testDefault;

        if (await internals.checkPath(options.dir)) {
            const fileList = await internals.glob(options.dir);
            fileList.forEach((file) => {

                if (file.match(fileTest)) {
                    const routeFile = require(file);

                    routeFile.routes(server);
                }
            });
        }
        else {
            throw new Error(`'${options.dir}' is not a valid glob path (e.g. routes/**/*)`);
        }

        server.log(['hapi-routes'], `Registered all routes in ${options.dir}`);
    }
};
