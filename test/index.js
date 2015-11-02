'use strict';

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;



lab.experiment('With right settings', () => {

    it('Sets up with right config', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, (err) => {

            expect(err).to.not.exist();

            return done();
        });
    });

    it('Adds all the routes in the routes folder to the server', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, (err) => {

            expect(err).to.not.exist();
            expect(server.table()[0].table.length).to.equal(2);

            return done();
        });
    });

    it('Returns a 404 on invalid route', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/routes' }
        }, (err) => {

            expect(err).to.not.exist();

            return server.inject({
                method: 'GET',
                url: '/404'
            }, (response) => {

                expect(response.statusCode, 'status code').to.equal(404);

                return done();
            });
        });
    });
});

lab.experiment('With wrong settings', () => {

    it('Returns an error on invalid dir option', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dir: 'test/invalid' }
        }, (err) => {

            expect(err).to.exist();
            expect(err.message).to.include('ENOENT');

            return done();
        });
    });
});
