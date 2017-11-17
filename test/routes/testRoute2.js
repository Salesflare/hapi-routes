'use strict';

const routes = [
    {
        method: '*',
        path: '/2',
        handler: function (request, reply) {

            return reply('Hello 2');
        }
    }
];

exports.routes = function (server) {

    return server.route(routes);
};
