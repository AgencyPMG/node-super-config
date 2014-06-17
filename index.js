/**
 * A Config Formatting
 */
var _ = require('underscore');

/**
 * @param configFiles {array} Required list of config files
 */
var Config = function(configFiles) {

}

Config.prototype.loadConfig = function(configFiles) {
    if (!configFiles) {
        throw 'Config Files are empty, this is a required field';
    }

    if(configFiles.length == 0) {
        return;
    }

    var config = require(configFiles[0]);
    for(var i=1; i<configFiles.length;i++) {
        try {
            var local = require(configFiles[i]);
            config = _.extend(config, local);
        } catch(e) {
            console.log('There was an error loading file: ' + configFiles[i]);
            console.log(e);
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
 * This can set variables inside the Koddi object, the third parameter, extends will merge the object instead of overriding it
 * @todo implement the extend parameter
 * @since 0.0.1
 * @access public
 * returns void
 */
Config.prototype.set = function(key, value, extend)
{
    if (typeof extend === 'undefined') extend = false;
    var comps = key.split(".");
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
