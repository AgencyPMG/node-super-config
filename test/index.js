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

    describe('#set - without a key', function() {
        it('should not set a value', function() {
            config.set(false, 'test');
            assert.equal('', config.get(false));
        });
    });

    describe('#set - with falsey values', function() {
        it('should store the values', function() {
            config.set('test.key', false);
            assert.equal(false, config.get('test.key'));
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

		it('should keep child elements the same if not present', function() {
			config.loadConfig([__dirname + '/config/subconfig']);
			assert.equal(true, config.get('db.host', false) === '127.0.0.1');
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
