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

const labels = [];

exports.routes = function (server) {

    return server.select(labels).route(routes);
};
