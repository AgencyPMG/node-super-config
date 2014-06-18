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
});
