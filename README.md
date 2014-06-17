Simple Node Config
===========

This light-weight NodeJS package allows you to load your config files, as well as easily edit them with getters and setters. The files have to be in JSON format.

##Examples

###Loading Config Files
Store the `simple-config` class in a variable and load as many configuration files as you have.
```
var config = require('simple-config');

config.loadConfig([
    __dirname + '/app/config/config',
    __dirname + '/app/config/local'
]);
```
**It's that simple.**

###Getting Information
Let's pretend we our config file contains this section of code:
```
database: {
    host:'127.0.0.1',
    port:'27017',
    dbname:'example_DB'
    }
```
It would pretty nice if we could easily retrieve that information right? Here's how-to:
```
var host = config.get('database.host', '');
var port = config.get('database.port', '');
var dbName = config.get('database.dbname', '');
```
**It's that simple.**

###Setting Information
Need to set some information in the config object? Not a problem:
```
config.set('database.host', 'mydbserver');
```

**Simple Config, it's THAT simple.**
