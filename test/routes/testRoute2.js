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

const labels = [];

exports.routes = function (server) {

    return server.select(labels).route(routes);
};
