/*
 * tests for config class
 */

var assert = require('assert');
var config = require('../');

describe('config/index', function() {

    describe('#set', function() {
        it('should return "test" for key: myvar', function() {
            config.set('myvar', 'test');
            assert.equal('test', config.get('myvar'));
        });
    });

    describe('#set - with inner dictionaries', function() {
        it('should return "test" for key myvar.name', function() {
           config.set('test.name', 'test');
           assert.equal('test', config.get('test.name'));
        });
    });

    describe('#get - with default value', function() {
        it('should return default value', function() {
            assert.equal('test', config.get('notavariable', 'test'));
        });
    });

    describe('#get - without key and default value', function() {
        it('should return an empty string', function() {
            assert.equal('', config.get('notavariable'));
        });
    });

    describe('#loadConfig', function() {
        it('should tell user file does not exist', function() {
            config.loadConfig('');
        });

        it('should load empty file', function() {
            config.loadConfig([__dirname + '/config/emptyconfig']);
        });

        it('should load file', function() {
            config.loadConfig([__dirname + '/config/config']);
        });
    });

    describe('#connectDatabase', function() {
        it('should call the function', function(done) {
            config.connectDatabase(function() {
                done();
            });
        });

        it('should call the function with return', function(done) {
            config.connectDatabase(function() {
                done();
                return done;
            });
        });
    });
});
