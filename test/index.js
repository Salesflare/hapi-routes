'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var it = lab.it;
var expect = Code.expect;



lab.experiment('With right settings', function () {

    it('Sets up with right config', function (done) {

        var server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, function (err) {

            expect(err).to.not.exist();

            return done();
        });
    });

    it('Adds all the routes in the routes folder to the server', function (done) {

        var server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, function (err) {

            expect(err).to.not.exist();
            expect(server.table()[0].table.length).to.equal(2);

            return done();
        });
    });

    it('Returns a 404 on invalid route', function (done) {

        var server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, function (err) {

            expect(err).to.not.exist();

            return server.inject({
                method: 'GET',
                url: '/404'
            }, function (response) {

                expect(response.statusCode, 'status code').to.equal(404);

                return done();
            });
        });
    });
});

lab.experiment('With wrong settings', function () {

    it('Returns an error on invalid dir option', function (done) {

        var server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/invalid' }
        }, function (err) {

            expect(err).to.exist();
            expect(err.message).to.include('ENOENT');

            return done();
        });
    });
});
