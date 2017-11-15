'use strict';

const routes = [
    {
        method: '*',
        path: '/1',
        handler: function (request, reply) {

            return reply('Hello 1');
        }
    }
];

exports.routes = function (server) {

    return server.route(routes);
};
