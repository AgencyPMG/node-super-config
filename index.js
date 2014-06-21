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
    for (var index in configFiles) {
        config = _.extend(config, this.loadSingleConfigFile(configFiles[index]));
    }

    for(var key in config) {
        this.set(key, config[key]);
    }
}

/**
 * Loads a given configuration file and returns an object
 * representing that file
 * @param filename {string} the file to load
 */
Config.prototype.loadSingleConfigFile = function(filename)
{
    try {
        return require(filename);
    } catch(e) {
        console.log('There was an error loading file: ' + filename, e);
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
    return _.reduce(key.split("."), function(result, partOfKey) {
        if (result[partOfKey]) {
            return result[partOfKey];
        } else {
            return typeof defaultValue == 'undefined' ? defaultValue : '';
        }
    }, this);
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
    var keyParts = key.split(".");
    var baseKey = keyParts.pop();

    var root = _.reduce(keyParts, function(result, partOfKey) {
        if (typeof result[partOfKey] == 'undefined') {
            result[partOfKey] = {};
        }
        return result[partOfKey];
    }, this);

    root[baseKey] = value;
}


/* Creates a singleton instance */
module.exports = new Config();
