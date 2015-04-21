'use strict';

var routes = [
    {
        method: '*',
        path: '/1',
        handler: function (request, reply) {

            return reply('Hello 1');
        }
    }
];

var labels = [];

exports.routes = function (server) {

    server.select(labels).route(routes);
};
