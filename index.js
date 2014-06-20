/**
 * A Config Formatting
 */
var _ = require('underscore');

var Config = function() {

}

/**
 * Loads a config file or multiple files
 * @param configFiles {string|array}
 * @return {void}
 */
Config.prototype.loadConfig = function(configFiles) {
    if (typeof configFiles === 'string') {
        configFiles = [configFiles];
    }

    var config = {};
    for(var i=0; i<configFiles.length;i++) {
        try {
            var local = require(configFiles[i]);
            config = _.extend(config, local);
        } catch(e) {
            console.log('There was an error loading file: ' + configFiles[i], e);
        }
    }

    for(var key in config) {
        this.set(key, config[key]);
    }
}

/**
 * Connects the database, should be done in the app.js file
 * @param databaseSetupFunction {function} a database setup that returns
 *        a connection or accepts a callback parameter
 */
Config.prototype.connectDatabase = function(databaseSetup)
{
    var callback = _.bind(function(error, database) {
        if (database) {
            this.set('db', database);
        }
    }, this);

    callback(null, _.bind(databaseSetup, this)(callback));
}

/**
 * This allows you to drill into the object safely,
 * use a dot to drill into the next object
 * @since 0.0.1
 * @access public
 * @returns object
*/
Config.prototype.get = function(key, defaultValue)
{
    if (typeof defaultValue === 'undefined') {
        defaultValue = '';
    }

    var obj = this;
    var comps = key.split(".");
    for(var index in comps) {
        if (typeof obj[comps[index]] === 'undefined') {
            return defaultValue;
        }
        obj = obj[comps[index]];
    }
    return obj;
}

/*
 * This can set variables inside the config object
 * @todo implement the extend parameter
 * @since 0.0.1
 * @access public
 * returns void
 */
Config.prototype.set = function(key, value)
{
    var comps = key.split('.');
    var obj = this;
    for(var index in comps) {
        if (typeof obj[comps[index]] === 'undefined') {
            obj[comps[index]] = (comps.length-1 == index)?value:{};
        } else if (comps.length-1 == index) {
            obj[comps[index]] = value;
        }
        obj = obj[comps[index]];
    }
}


/* Creates a singleton instance */
module.exports = new Config();
